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
runner. See [testing.md](testing.md) for details on test infrastructure and
patterns.

### `packages/dev`

Development server that mocks pcsd backend responses, enabling UI development
without a running cluster. See [architecture_dev.md](architecture_dev.md) for
details on scenarios, response builders, and shortcuts.

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

Each layer has its own detailed documentation:

- **[Backend layer](architecture_backend.md)** (`backend/`) — API communication,
  endpoints, call functions, response validation
- **[Store layer](architecture_store.md)** (`store/`) — Redux state, actions,
  sagas, reducers, selectors
- **[View layer](architecture_view.md)** (`view/`) — React components,
  structural vs. shared components, tasks, data-test system
