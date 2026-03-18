# Architecture

## Project structure

The repository is organized as a multi-package project. The main motivation is
to separate the application's runtime dependencies from development and testing
tooling. This allows distributing the application without unnecessary
dependencies.

```
packages/
  app/      — the application itself
  test/     — end-to-end tests (Playwright + Jest)
  dev/      — development server mocking the pcsd backend
```

### `packages/app`

The SPA source code. See [Application architecture](#application-architecture)
below.

### `packages/test`

End-to-end tests using Playwright for browser automation and Jest as the test
runner. Tests are organized by feature in `src/test/scenes/` (e.g. `acl/`,
`cluster/`, `resources/`, `dashboard/`).

Tests use a custom locator system based on `data-test` attributes and can run in
three modes:
- **mocked** (default) — fully mocked backend responses
- **standalone** — against a real pcsd backend
- **cockpit** — against a real backend via Cockpit

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to run tests.

### `packages/dev`

An Express.js development server that mocks pcsd responses. It serves the
built application and provides scenario-based mock data, making it easy to
develop and test UI states that are hard to reproduce on a real cluster (errors,
edge cases, specific configurations).

Run with `make dev`, then open http://localhost:5000.

---

## Application architecture

Source code: `packages/app/src/app/`

The application is a Single Page Application (SPA) built with:
- **React** — UI components
- **PatternFly** — Red Hat design system (component library and styles)
- **Redux** — global state management
- **Redux-Saga** — side effect orchestration (API calls, timers, async flows)
- **io-ts** — runtime validation of backend responses
- **esbuild** — bundler

### Two deployment modes

The application can run as a standalone web app or as a
[Cockpit](https://github.com/cockpit-project/cockpit) plugin. This is achieved
through an **adapter pattern**: the page loads one of two adapter scripts
(`packages/app/public/static/adapter.js` or `adapterCockpit.js`) that provide a
common interface (`window.pcsUiEnvAdapter`) for environment-specific behavior:

- HTTP requests (direct fetch vs. Cockpit's Unix socket API)
- URL routing (History API vs. Cockpit location)
- User identity and permissions
- Color scheme / theming

The application code itself is mode-agnostic — it only uses the adapter
interface.

### Application layers

```
packages/app/src/app/
  backend/    — API communication layer
  store/      — Redux state, reducers, sagas, selectors
  view/       — React components (UI)
```

#### Backend layer (`backend/`)

Handles all communication with the pcsd backend. Key aspects:
- Defines API endpoints and HTTP calls (GET/POST)
- Validates responses using **io-ts** codecs
- Returns a discriminated union result type: `Ok | InvalidPayload | HttpFail |
  NotJson`
- All HTTP goes through `pcsUiEnvAdapter.request()`, keeping the layer
  mode-agnostic

#### Store layer (`store/`)

Global state management using Redux. Contains:
- **Reducers** — state shape and transitions
- **Sagas** — async workflows (API calls, periodic data refresh, error handling)
- **Selectors** — derived state for components
- **Actions** — action types and creators

Sagas handle data loading lifecycle (start/stop/refresh), authorization, and
error notifications.

#### View layer (`view/`)

React components organized by domain:

```
view/
  dashboard/   — cluster list, cluster-level actions
  cluster/     — cluster detail: resources, nodes, constraints, ACL,
                 fence devices, SBD, properties, permissions
  task/        — modal wizard dialogs for multi-step operations
  share/       — reusable components, hooks, and utilities
```

**Tasks** are a central UI concept — modal wizard dialogs that guide users
through complex operations (e.g. cluster setup, adding a node, creating a
resource). Each task has its own folder with a component and a `useTask` hook for
state management. All tasks are registered in `task/taskMap.ts`.
