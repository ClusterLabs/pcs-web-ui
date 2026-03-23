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

An Express.js development server that mocks pcsd responses. It serves the
built application and provides scenario-based mock data, making it easy to
develop and test UI states that are hard to reproduce on a real cluster (errors,
edge cases, specific configurations).

Run with `make dev`, then open http://localhost:5000.

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
  dataTest/    — data-test attribute definitions (see below)
```

**Tasks** are a central UI concept — modal wizard dialogs that guide users
through complex operations (e.g. cluster setup, adding a node, creating a
resource). Each task has its own folder with a component and a `useTask` hook for
state management. All tasks are registered in `task/taskMap.ts`.

##### Two kinds of components

Components in the view layer fall into two categories:

- **Structural components** have a unique, fixed place in the page hierarchy.
  For example, `PrimitiveAttrsView` renders the attributes tab of a specific
  primitive resource. They are not reusable — their identity comes from *where*
  they appear.

- **Shared components** (`view/share/`, `view/cluster/share/`) are reusable
  building blocks with no inherent position in the page structure. They render
  whatever data they receive.

This distinction matters for the data-test system (see below): only structural
components know *where* they sit in the page, so only they can assign the
correct data-test marks. A shared component cannot decide which mark to use
because it does not know which structural context it is in.

The same reasoning extends beyond marks: **do not narrow the scope of an
existing shared component by adding domain-specific behavior.** If a shared
component is already used across contexts with different semantics, adding logic
that only applies to some of them couples it to a context it was not designed
for and breaks it elsewhere. Instead, create a new purpose-built shared
component for the specialized case — a shared component *can* contain domain
logic as long as it is designed and named for that purpose from the start.

When a data-test mark needs to be placed on an element deep inside a shared
component, the preferred strategy is to **pull that element up** into the
structural component (inline it or extract it so the structural component can
mark it directly). This avoids threading mark props through shared components
and, as a side effect, makes the structural component more explicit about what
it renders.

##### Shared component hierarchy

Shared components live at two levels:

- **`view/share/`** — general-purpose components with no knowledge of the
  cluster domain (e.g. `AttributeValue`, `AttributeName`). These are purely
  presentational building blocks.

- **`view/cluster/share/`** — components that understand cluster-domain concepts
  (e.g. pcmk agent parameters, NV pairs) but are still reusable across multiple
  structural components within the cluster context.

### Data-test system

Source: `packages/app/src/app/view/dataTest/`

The data-test system provides stable, unique locators for UI elements. It was
introduced for QA — external test suites use these attributes to locate elements,
and a generated JSON manifest lets QA detect what changed between versions. The
project's own end-to-end tests also use these marks (see
[testing.md](testing.md)).

#### Structure

Marks are defined as a static JSON tree in `dataTest/json/`. The tree mirrors the
page hierarchy:

```
cluster
  resources
    currentPrimitive
      attributes
        pair
          name
          value
          secret
      tabs
        attributes
        detail
        meta
        utilization
  fenceDevices
    currentFenceDevice
      arguments
        pair
          name
          value
          secret
```

Both inner nodes and leaves can serve as marks. Each produces a unique
`data-test` attribute value by joining the path, e.g.
`cluster.resources.currentPrimitive.attributes.pair` (an inner node) or
`cluster.resources.currentPrimitive.attributes.pair.name` (a leaf). These paths
are **static** — they must never be composed dynamically at runtime.

The tree preserves DOM hierarchy: an element marked with an inner node is
expected to be an ancestor of elements marked with that node's subtree. For
example, under an element marked `...pair` you would find `...pair.name` and
`...pair.value`, but not `...currentGroup`. The goal is to mark every node in
the tree, though this is not always possible (e.g. a `dt`/`dd` pair may not
share a common parent element).

`dataTest/index.ts` transforms the JSON tree into a typed `testMarks` object.
Components use it as `{...testMarks.cluster.resources.currentPrimitive.id.mark}`
to spread the `data-test` attribute onto a DOM element.

#### Rules

1. **Each component receives at most one mark.** If a component needs to mark
   multiple internal elements, the inner elements should be factored out so that
   structural components can mark them individually.

2. **Only structural components assign marks.** Shared components do not know
   which mark to use (see "Two kinds of components" above).

3. **Marks are static.** Never concatenate or compute mark paths at runtime.
   The JSON definition is the single source of truth.
