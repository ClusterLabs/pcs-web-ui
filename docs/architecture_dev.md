# Development server

Source: `packages/dev/`

A local Express.js server that mocks pcsd backend responses, enabling UI
development without a running cluster. It builds the application in watch mode
(via esbuild) and serves it with live reload — code changes are reflected in the
browser automatically.

Run with `make dev`. The server uses the first free port starting at 5000 (set
`PORT` to force a specific one) and prints the actual address on startup as
`<scenario>: http://localhost:<port>`. The application is at
`http://localhost:<port>/ui`.

## How it works

When the server starts, it:

1. Builds the application using esbuild in watch mode (rebuilds on source
   changes).
2. Starts an Express server that serves the built application at `/ui`.
3. Loads a **scenario** file that registers mock handlers for backend endpoints.
4. Opens a WebSocket for live reload — the browser refreshes when the build
   output changes.

All mock responses are delayed by a configurable amount (env vars `DELAY` and
`DELAY_RND`, defaults 100 ms each) to simulate network latency.

## Scenarios

Source: `packages/dev/src/dev/scenarios/`

A scenario is a TypeScript file that sets up the mock server for a particular UI
workflow. Each scenario registers handlers for the backend endpoints that the
workflow needs — when the application makes an HTTP request, the matching handler
returns a predefined mock response.

### Selecting a scenario

The scenario is selected at startup:

- **`PCSD_SCENARIO=<name> make dev`** — run a specific scenario by name (without
  `.ts` extension).
- **`make dev`** (no env var) — if `fzf` is installed, an interactive picker is
  shown; otherwise, the available scenarios are listed for manual selection.

### Scenario structure

A scenario typically does two things, in this order:

1. Registers handlers for endpoints specific to the workflow being developed
   (e.g. a `resource-create` lib command handler).
2. Calls **shortcuts** to set up the common baseline (cluster status, agent
   lists, permissions, etc.).

Example:

```typescript
import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";

// 1. Register a handler for the specific lib command
app.libCluster("resource-create", (req, res) => {
  shortcut.libStd({code: req.body.resource_id, res});
});

// 2. Set up the common cluster baseline
shortcut.clusterStatus(response.clusterStatus.resourceTree);
shortcut.clusterRelated();
```

The baseline is the cluster status (`shortcut.clusterStatus(…)`) plus the
cluster-level handlers registered by `shortcut.clusterRelated()`. The baseline
is required: an endpoint without a registered handler responds with 404, and
the application then shows an error or never finishes loading. TypeScript checks
the shape of the handlers, not whether a scenario is complete. The
`single-cluster.ts` scenario is the minimal reference for this baseline with no
workflow-specific handlers.

The order matters because Express uses the first handler registered for a URL.
A scenario that overrides an endpoint also registered by a shortcut (e.g. its
own `app.getPermissions` handler) must register the override before calling
the shortcut.

The `setup-cluster.ts` scenario is the reference for a host that is not in a
cluster: the cluster status and the other startup endpoints respond with 400
and `response.noCluster.message`.

### Scenario variants

When a workflow needs several cluster states or backend responses (e.g. a
successful and a failing cluster start), each variant is a separate scenario
named `<base>-<variant>` (e.g. `cluster-start-stop-error`); the default variant
keeps the base name. Handlers shared by the variants go into a shortcut
`<name>Related()` in `shortcuts/` (e.g. `shortcut.resourceActionsRelated()`),
so each variant file only adds its own handlers and cluster status.

A handler may branch on a value from the request (e.g. a resource name passed
to `shortcut.libStd`), which lets the developer pick the outcome in the UI. A
response that the request cannot select belongs to its own variant.

The `cluster-state-*` scenarios (e.g. `cluster-state-standby`,
`cluster-state-big`) are a set for visually checking how the application
renders different cluster states. Each one registers only a cluster status and
the baseline, one state per scenario. A new state to check gets its own
`cluster-state-<state>` scenario.

## The `app` object

Source: `packages/dev/src/dev/app.ts`

The `app` object provides typed handler registration for every backend endpoint
defined in the application's `endpoints` module. Each method on `app` corresponds
to an endpoint and accepts an Express request handler:

```typescript
app.clusterStatus((_req, res) => {
  res.json(response.clusterStatus.resourceTree);
});
```

For library commands (which share a single URL pattern parameterized by command
name), the registration takes an additional command name argument:

```typescript
app.libCluster("resource-create", (req, res) => {
  res.json(response.lib.success());
});
```

This tight coupling with the application's endpoint definitions means the
TypeScript compiler catches mismatches between the dev server and the real
backend contract.

## Shortcuts

Source: `packages/dev/src/dev/shortcuts/`

Shortcuts are helper functions that register multiple related handlers at once,
reducing boilerplate in scenarios.

- **`shortcut.clusterStatus(status)`** — registers a cluster status handler
  that always returns the given status (a preset from `response.clusterStatus`
  or one composed with `clusterStatus/tools`). A scenario that needs a status
  that changes over time registers `app.clusterStatus(…)` directly.
- **`shortcut.clusterRelated()`** — the most common shortcut. Registers the
  cluster-level handlers: resource and fence agent lists, agent metadata,
  cluster properties, and permissions. Scenarios pair it with
  `shortcut.clusterStatus(…)` (see `single-cluster.ts` for the minimal
  baseline).
- **`shortcut.checkAuthAgainstNodes(…)`** / **`shortcut.authGuiAgainstNodes()`** —
  register the node-authentication endpoints, used by scenarios that exercise
  node auth flows.
- **`shortcut.<name>Related()`** (e.g. `resourceActionsRelated()`,
  `nodeAddRelated()`) — register the workflow handlers shared by the variants
  of one scenario (see [Scenario variants](#scenario-variants)).
- **`shortcut.libStd({code, res})`** — a handler helper (not a registration
  shortcut) for library command scenarios. It maps a `code` value from the
  request body to a standard response. This lets a single scenario handler
  produce different outcomes based on user input (e.g. a resource name that
  determines whether creation succeeds or fails). Supported codes:

  | Code                | Response                                    |
  |---------------------|---------------------------------------------|
  | `"success"` / `"ok"`| success                                     |
  | `"fail"`            | error with reports                          |
  | `"force"`           | forcible error (error with `force_code`)     |
  | `"error"`           | HTTP 500                                    |
  | `"invalid"`         | invalid response (malformed shape)           |
  | `"invalid-json"`    | input error (JSON parse failure)             |
  | `"missing-key"`     | input error (missing `cmd` key)              |
  | `"unknown-cmd"`     | rejected: unknown command                   |
  | `"permission-denied"`| rejected: permission denied                 |
  | `"not-authorized"`  | not authorized (HTTP-level auth failure)     |

  Any unrecognized code falls through to success. The helper also accepts an
  `errors` map for custom error responses keyed by code.

## Response builders

Source: `packages/dev/src/dev/responses/`

Functions and objects that construct mock response bodies conforming to the
backend's data shapes. Response types are derived from the application's backend
types (via `api.PayloadOf<…>`), so they stay in sync with what the runtime code
validates against.

These response builders are **shared with the test mock infrastructure** — see
[testing.md](testing.md#mock-infrastructure).

Key areas:

- **`lib`** — library command responses: `success()`, `error([…reports])`,
  `report.error({…})`, rejected status shapes (`unknownCmd`,
  `permissionDenied`, etc.), and malformed edge cases (`invalid`).
- **`clusterStatus`** — preconfigured cluster status objects (`ok`, `error`,
  `big`, `empty`, `resourceTree`, etc.).
- **`clusterStatus/tools`** — factory functions for composing cluster status from
  parts: `cluster()`, `node()`, `primitive()`, `stonith()`, `group()`, `clone()`.
  Each accepts an ID and an optional partial override that is deep-merged with
  sensible defaults.
- **Other modules** — agent metadata, agent lists, permissions, cluster
  properties, ACL, etc.

## Proxy scenario

The `proxy.ts` scenario is special — instead of mocking responses, it forwards
all requests to a real pcsd instance (configured via `PCSD_HOST_PROXY` and
`PCSD_PORT_PROXY` env vars). This is useful when you want live reload and the dev
build pipeline but need to work against a real backend.
