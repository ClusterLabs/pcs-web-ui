# View layer

Source: `packages/app/src/app/view/`

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
unknown props to an internal element instead — for example, PF5 `Switch`
spreads extra props onto its hidden `<input>`, not the outer `<label>`.

When this happens, wrap the component in a plain element that carries the mark:

```tsx
<span data-test={dataTest}>
  <Switch id="my-toggle" label="Toggle" ... />
</span>
```
