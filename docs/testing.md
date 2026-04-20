# Testing

End-to-end tests using Playwright for browser automation and Jest as the test
runner. There are two categories of tests:

- **Mocked tests** (`packages/test/src/test/scenes/`) — use fully mocked backend
  responses. Organized by feature (e.g. `acl/`, `cluster/`, `resources/`,
  `dashboard/`). These offer full control over the application state, making it
  easy to simulate edge cases and error scenarios. The tradeoff is that mocks
  can diverge from the real backend behavior.

- **Real backend tests** (`packages/test/src/test/realBackend/`) — run against a
  real pcsd instance, either standalone or via Cockpit. These verify that the UI
  works with the actual backend but depend on a running cluster environment and
  offer less flexibility in controlling state.

## Running tests

Run all tests with:

```sh
make test
```

### Watch mode

If `inotifywait` is available, tests run in watch mode — they automatically
re-run when source files change.

### Configuration

Test behavior can be customized via environment variables.
You can set them directly or load them from a shell config file before each run.

Use the `PCS_WUI_DEV_CONF` environment variable to point to a config file.
This file is also watched by inotifywait.

Example:
```sh
PCS_WUI_DEV_CONF=$HOME/project/pcs-web-ui.tools/test-config.sh make test
```

Example configuration script content:
```sh
# Run in headless mode (by default, browser is visible)
export PCS_WUI_TESTS_HEADLESS=true

# Select test type:
# - mocked (default): uses mocked backend responses
# - standalone: uses real backend in standalone mode
# - cockpit: uses real backend in cockpit mode
export PCS_WUI_TEST_TYPE=standalone

# Real backend connection settings
export PCSD_PROTOCOL_1=https
export PCSD_HOST_1=localhost
export PCSD_PORT_1=2224

# Node name as seen by the real backend
export PCSD_NODE_1=node1.vm

# Real backend credentials
export PCSD_USERNAME_1=hacluster
export PCSD_PASSWORD_1=password

# Directory to store video recordings (set to enable)
# export PCS_WUI_TESTS_VIDEO_DIR="/tmp/pcs-web-ui-video"
unset PCS_WUI_TESTS_VIDEO_DIR

# Select specific tests to run (paths relative to packages/test/src/test/scenes)
set -- \
  acl/role-add-permissions.test.ts \
  acl/role-assign-group.test.ts

export PCS_WUI_TESTS=$*
```

See also [gitlab-ci.yml](../.gitlab-ci.yml) for more examples.

## Test preset and globals

The Jest preset (`packages/test/src/test/jest/preset.ts`) runs once before all
tests. It launches a single Chromium browser instance with a single shared
`page` and injects a set of **global variables** — these are available in every
test file without imports:

- **`page`** — the shared Playwright Page instance
- **`marks`** — typed data-test locator tree (mirrors the application's mark
  structure)
- **`item`** — utilities for finding items in lists by name, key, id, or index
- **DOM interaction**: `click`, `fill`, `select`, `isVisible`, `isAbsent`,
  `radioGroup`, `appConfirm`, `fieldError`, `locatorFor`, `locatorRelativeFor`
- **Navigation**: `goToDashboard`, `goToCluster`
- **`login`** — authentication helper

**Not globals** — `mock` and `assert` are imported explicitly from `test/tools`
in each test file.

### Shared page and state isolation

All tests share the same browser page instance. The `afterEach(mock.stop)`
teardown cleans up route mocks and verifies that no unexpected URLs were called,
but it does **not** clean up browser state (localStorage, sessionStorage,
cookies). Tests that modify browser state must handle their own cleanup —
typically via `page.evaluate(() => localStorage.removeItem(...))` in
`beforeEach`.

## Mock infrastructure

Mocked tests intercept HTTP requests using Playwright's `page.route()` API. The
mock system (`packages/test/src/test/tools/mock/`) provides route definitions
that match backend URLs and return predefined responses. A current limitation is
that each URL can only have one route — there is no support yet for returning
different responses on successive calls to the same endpoint (e.g. first call
fails, second succeeds). At cleanup (`mock.stop()`), the system verifies that no
unexpected (unmocked) URLs were called.

Most tests set up mocks via `mock.shortcuts.withCluster()`, which registers a
standard set of routes (cluster status, agent lists, permissions, etc.) and
accepts additional or replacement routes for test-specific needs. Cluster status
is built using factory functions from `dev/responses/clusterStatus/tools`
(`cluster()`, `primitive()`, `stonith()`, `group()`, `clone()`).

### Routes and response builders

A **route** is an object that pairs a URL pattern with request expectations
(payload/body/query) and a response (`json`, `text`, `status`, or `handler`).
Routes are defined in `packages/test/src/test/tools/mock/routes/`. At teardown,
the mock framework validates that every registered route was actually called and
that each request's payload matched what the route expected.

Many routes wrap the pcs library API. These share a common base function
`libCluster()` (in `routes/libCluster.ts`) that builds the URL from the command
name, attaches the payload, and defaults to a success response. Individual route
files (e.g. `resourceCreate.ts`, `resourceEnable.ts`) are thin wrappers that
provide typed parameters for a specific command. Payload types are derived from
the application's `LibClusterCommands` type, so route definitions stay in sync
with the endpoint contract.

Response bodies for library commands are built using helpers in
`packages/dev/src/dev/responses/lib.ts`:

- `responses.lib.success()` — success with `data: null` (default)
- `responses.lib.success({data: …})` — success with command-specific data
- `responses.lib.error([…reports])` — error with a report list
- `responses.lib.report.error({…})` — builds a single error report (with
  sensible defaults, customizable via deep merge)

The response type is derived from the application's lib shape
(`api.PayloadOf<typeof libCallCluster>`), so mock responses conform to the same
structure the runtime code validates against.

## Locators and assertions

Tests use the same data-test mark tree as the application (see
[architecture.md — Data-test system](architecture.md#data-test-system)). A
global `marks` object is available in tests, providing typed access to data-test
locators.

Key patterns:

- **`click(mark)`** — click an element by its mark
- **`isVisible(mark)`** / **`isAbsent(mark)`** — wait for visibility/absence
- **`assert.textIs(mark, text)`** — verify text content
- **`assert.countIs(mark, n)`** — verify element count
- **`item.byName(listMark, name, m => m.child)`** — find an item in a list by
  matching text in its `name` sub-mark, then access a child mark within it. This
  is the primary pattern for verifying name-value pairs and similar list items.
- **`assert.nvPairIs(pairMark, name, value)`** — shorthand built on
  `item.byName` that finds a pair by name and checks its value

## Troubleshooting

### `click(mark)` or `isVisible(mark)` times out on a PatternFly component

Playwright waits for the target element to be visible before clicking. If a
PatternFly component forwards the `data-test` attribute to a hidden internal
element (e.g. PF5 `Switch` puts it on its visually-hidden `<input>`), the
locator will never resolve. The fix is to wrap the component in a plain element
carrying the mark — see [Marking PatternFly
components](architecture_view.md#marking-patternfly-components).
