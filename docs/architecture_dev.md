# Development server

Source: `packages/dev/`

A local Express.js server that mocks pcsd backend responses, enabling UI
development without a running cluster. It builds the application in watch mode
(via esbuild) and serves it with live reload — code changes are reflected in the
browser automatically.

Run with `make dev`, then open http://localhost:5000.

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

A scenario typically does two things:

1. Registers handlers for endpoints specific to the workflow being developed
   (e.g. a `resource-create` lib command handler).
2. Calls a **shortcut** to set up the common baseline (cluster status, agent
   lists, permissions, etc.).

Example (`resource-create.ts`):

```typescript
import {app} from "dev/app";
import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";

// 1. Register a handler for the specific lib command
app.libCluster("resource-create", (req, res) => {
  shortcut.libStd({code: req.body.resource_id, res});
});

// 2. Set up common cluster state
shortcut.dashboard([response.clusterStatus.resourceTree]);
```

## The `app` object

Source: `packages/dev/src/dev/app.ts`

The `app` object provides typed handler registration for every backend endpoint
defined in the application's `endpoints` module. Each method on `app` corresponds
to an endpoint and accepts an Express request handler:

```typescript
app.importedClusterList((_req, res) => {
  res.json(response.importedClusterList.withClusters(["my-cluster"]));
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

- **`shortcut.dashboard(clusterStatusList)`** — the most common shortcut. Sets up
  imported cluster list, cluster status responses, resource/fence agent lists,
  agent metadata, cluster properties, and permissions. Most scenarios end with a
  call to this shortcut.
- **`shortcut.clusterRelated()`** — registers agent lists, metadata, properties,
  and permissions (the cluster-level handlers without dashboard/status).
- **`shortcut.importedClusterList(…)`** — registers just the imported cluster
  list endpoint.
- **`shortcut.libStd({code, res})`** — a handler helper (not a registration
  shortcut) for library command scenarios. It maps a `code` value from the
  request body to a standard response: `"success"` / `"ok"` → success,
  `"fail"` → error with reports, `"force"` → forcible error, `"error"` → HTTP
  500, and others. This lets a single scenario handler produce different outcomes
  based on user input (e.g. a resource name that determines whether creation
  succeeds or fails).

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
  `report.error({…})`, and edge-case shapes (`invalid`, `unknownCmd`, etc.).
- **`clusterStatus`** — preconfigured cluster status objects (`ok`, `error`,
  `big`, `empty`, `resourceTree`, etc.).
- **`clusterStatus/tools`** — factory functions for composing cluster status from
  parts: `cluster()`, `node()`, `primitive()`, `stonith()`, `group()`, `clone()`.
  Each accepts an ID and an optional partial override that is deep-merged with
  sensible defaults.
- **Other modules** — agent metadata, agent lists, permissions, cluster
  properties, ACL, imported cluster list, etc.

## Proxy scenario

The `proxy.ts` scenario is special — instead of mocking responses, it forwards
all requests to a real pcsd instance (configured via `PCSD_HOST_PROXY` and
`PCSD_PORT_PROXY` env vars). This is useful when you want live reload and the dev
build pipeline but need to work against a real backend.
