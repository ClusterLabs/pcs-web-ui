# View layer

Source: `packages/app/src/app/view/`

React components organized by domain:

```
view/
  cluster/     — cluster detail: resources, nodes, constraints, ACL,
                 fence devices, SBD, properties, permissions
  task/        — modal wizard dialogs for multi-step operations
  share/       — reusable components, hooks, and utilities
  dataTest/    — data-test attribute definitions (see below)
```

The application manages a **single cluster** — the one the backend node
participates in (the node the web UI is served from). The application starts
directly in the **cluster detail** view (the root route), which shows the
cluster's configuration organized into tabs (resources, nodes, constraints,
etc.). The cluster name comes from the backend response, not from the URL.
Navigation uses a custom router (`view/share/router/`) with URL patterns defined
in `view/share/location.ts`.

## Component file organization

Each React component has a unique name and lives in its own file. The file name
matches the component name (e.g. `SecretsAgePopover` →
`SecretsAgePopover.tsx`). Do not define multiple components in a single file.

## Two kinds of components

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

## Shared component hierarchy

Shared components live at two levels:

- **`view/share/`** — general-purpose components with no knowledge of the
  cluster domain (e.g. `AttributeValue`, `AttributeName`). These are purely
  presentational building blocks.

- **`view/cluster/share/`** — components that understand cluster-domain concepts
  (e.g. pcmk agent parameters, NV pairs) but are still reusable across multiple
  structural components within the cluster context.

## Deriving prop types

When a component prop carries data that originates from a selector, derive its
type from the selector rather than writing it manually. Manual types risk getting
out of sync when the selector's shape changes. For cluster selectors use
`ExtractClusterSelector<typeof selectorFn>`.

## Styling

The project has a single CSS file for all custom styles:
`packages/app/src/app/view/app/App.css`. There are no per-component CSS files
and no CSS-in-JS.

### PatternFly CSS

PatternFly React components automatically import their own CSS — each
component's JS module imports a `.mjs` file from `@patternfly/react-styles`,
which in turn imports the corresponding `.css`. esbuild picks this up and
bundles the CSS with no manual action needed.

Two things still require explicit imports in the application entry point
(`src/index.tsx`):

- **Base styles** — `@patternfly/react-core/dist/styles/base.css` (reset,
  typography, scrollbar). No component imports this.
- **Utility CSS** — classes like `pf-v6-u-mt-sm` or `pf-v6-u-h-100` are
  applied via `className` strings, not through React components, so their CSS
  is not auto-imported. Each utility category (spacing, sizing, flex) has its
  own stylesheet in `@patternfly/react-styles/css/utilities/`.

### Custom CSS classes

Project-specific CSS classes use the `ha-` prefix (for "HA" — High
Availability) to distinguish them from PatternFly classes. The naming follows
PatternFly's BEM-like convention:

- Components: `ha-c-*` (e.g. `ha-c-panel__tree-view`, `ha-c-tree-view`)
- Modifiers: `ha-m-*` (e.g. `ha-m-full-height`, `ha-m-active`)
- Utilities: `ha-u-*` (e.g. `ha-u-status-danger`)

### Dark mode

Dark theme works by toggling the `pf-v6-theme-dark` CSS class on the `<html>`
element. The `colorScheme` module (`view/colorScheme.ts`) supports three modes:
"auto" (follows OS preference via `prefers-color-scheme` media query), "dark",
and "light". The user's choice is persisted in localStorage under a key provided
by the adapter.

In standalone mode, the application owns theme switching — a user menu toggle
dispatches custom events for cross-tab synchronization. In Cockpit mode, Cockpit
controls the theme and the adapter only listens, never dispatches.

PatternFly handles dark mode automatically through its CSS custom properties.
Custom CSS that needs dark mode awareness uses `:where(.pf-v6-theme-dark)` as a
selector (zero specificity).

## Data-test system

Source: `packages/app/src/app/view/dataTest/`

The data-test system provides stable, unique locators for UI elements. It was
introduced for QA — external test suites use these attributes to locate elements,
and a generated JSON manifest lets QA detect what changed between versions. The
project's own end-to-end tests also use these marks (see
[testing.md](testing.md)).

### Structure

Marks are defined as a static JSON tree in `dataTest/json/`. The tree mirrors the
page hierarchy:

```
cluster
  resources
    currentPrimitive
      attributes
        secretsToggle
        pair
          name
          value
          secret
          secretRevealed
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
          secretRevealed
      argumentsToolbar
        secretsToggle
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

### Rules

1. **Each component receives at most one mark.** If a component needs to mark
   multiple internal elements, the inner elements should be factored out so that
   structural components can mark them individually.

2. **Only structural components assign marks.** Shared components do not know
   which mark to use (see "Two kinds of components" above).

3. **Marks are static.** Never concatenate or compute mark paths at runtime.
   The JSON definition is the single source of truth.

4. **Structural component controls marking across states.** When a shared
   component has multiple visual states requiring different marks, the
   structural component must control the marking — not the shared component
   (which does not know which state will render).

## Tasks

Tasks are modal wizard dialogs that guide users through complex operations
(e.g. cluster setup, adding a node, creating a resource). Each task has its own
folder with a set of components — typically one per wizard step plus footers and
result screens — and a `useTask` hook. All tasks are registered in
`task/taskMap.ts`.

Each task's `useTask` hook builds on `useTaskCommon` (which provides lifecycle
methods and task state selection) and serves as the single interface between the
task's components and the store layer. It typically provides:

- **Derived data** — selects and computes values from Redux state for the task's
  components (e.g. filtered lists, loaded agent info).
- **Validation** — boolean flags indicating whether form inputs are valid
  (e.g. `isNameValid`, `areLinksValid`).
- **State updates** — functions that dispatch actions to mutate the task's form
  state as the user fills in the wizard.
- **Execution** — functions that prepare the final payload from form state and
  dispatch the action that triggers the operation. The dispatched action depends
  on the task — library commands use `LIB.CALL.CLUSTER.TASK` (see
  [Library command actions](architecture_store.md#library-command-actions)),
  while other tasks dispatch domain-specific actions directly
  (e.g. `CLUSTER.STOP`, `NODE.ADD`).

### Task result screens

Tasks that use `LIB.CALL.CLUSTER.TASK` must provide a result screen for each
response state from the [task response
lifecycle](architecture_store.md#task-response-lifecycle). The `TaskResultLib`
shared component switches on the response state and renders the appropriate
screen:

- **success** — operation completed; typically shows a success message.
- **fail / forceable-fail** — command returned an error; shows reports and
  recovery options (back to edit, force proceed).
- **communication-error** — HTTP/validation failure or rejected status; offers
  retry.
- **permission-denied** — user lacks permission; offers retry.
- **progress** — request in flight; shows a spinner (handled by default).

Wizard-style tasks can use `TaskFinishLibWizard` which provides default
implementations for unsuccess, communication error, and permission denied
screens. Simple (non-wizard) tasks compose these screens individually via
`TaskSimpleLib` or `TaskResultLib` directly, typically with a task-specific
`PermissionDenied` component that wires the retry action from the task's
`useTask` hook.

## Techniques

Patterns for specific situations that arise from the rules and concepts above.
Read when you encounter the described situation during implementation.

### Pulling elements up for marking

*When: a data-test mark needs to be placed on an element deep inside a shared
component.*

The preferred strategy is to **pull that element up** into the structural
component (inline it or extract it so the structural component can mark it
directly). This avoids threading mark props through shared components and, as a
side effect, makes the structural component more explicit about what it renders.

### Extracting logic into a shared component

*When: a structural component accumulates state, selectors, and conditional
rendering that all serve a single element in its output.*

Consider whether that logic would be better placed in a dedicated shared
component — so the structural component stays focused on page layout and
orchestration.

### Multiple marks on one shared component

*When: a shared component has multiple visual states and each needs a different
data-test mark.*

Use **render props**: the shared component accepts a callback for each state and
invokes the appropriate one with the content to display. The structural
component wraps each callback's content with the correct mark:

```tsx
<SecretValue
  revealed={value => <span {...marks.revealed.mark}>{value}</span>}
  hidden={value => <span {...marks.hidden.mark}>{value}</span>}
/>
```

The shared component decides *which* state to render; the structural component
decides *how* to mark it.

### Marking PatternFly components

*When: a `data-test` attribute needs to be placed on a PatternFly component.*

Most PatternFly components forward unknown props to their root DOM node, so
passing `data-test` directly works fine. A few components, however, forward
unknown props to an internal element instead — for example, `Switch` spreads
extra props onto its hidden `<input>`, not the outer `<label>`.

When this happens, wrap the component in a plain element that carries the mark:

```tsx
<span data-test={dataTest}>
  <Switch id="my-toggle" label="Toggle" ... />
</span>
```
