# Store layer

Source: `packages/app/src/app/store/`

Global state management using Redux. Contains:
- **Actions** — action type definitions (discriminated unions with typed
  payloads). Action payload types often reference backend types via
  `api.PayloadOf<typeof callFn>`, keeping them in sync with the backend layer
  automatically.
- **Sagas** — generator-based async workflows that call the backend, inspect
  results, and dispatch actions. Common saga utilities:
  - `authSafe(fn, ...args)` — wraps any call function; on 401 it triggers the
    login dialog, waits for success, and retries once transparently.
  - `processError(result, taskLabel)` — centralized non-OK result handler:
    logs, shows user-facing notification, optionally runs a callback.
  - `dataLoad.manage()` — generic periodic-sync lifecycle (start / stop /
    refresh) used for cluster status polling and similar.
- **Reducers** — state shape and transitions. Where the backend returns a
  different structure than the UI needs, a transformation layer (`apiToState/`)
  sits between the raw payload and the reducer.
- **Selectors** — derived state for components.

The typical data flow for a backend-driven feature is:

```
UI event / timer
  → saga catches action
    → authSafe(callFn, ...) → HTTP request → io-ts validation → Result
      → OK:  dispatch success action (payload goes to reducer)
      → not OK: processError (notification + optional failure action)
```

## Library command actions

The store defines a family of actions for invoking pcs library commands through
the [libCluster mechanism](architecture_backend.md#library-command-mechanism-libcluster):

- **`LIB.CALL.CLUSTER`** — fire-and-forget: the saga calls the backend, shows a
  success/error notification, and refreshes cluster status.
- **`LIB.CALL.CLUSTER.TASK`** — task-wizard-based: the saga calls the backend
  and dispatches `TASK.OK` / `TASK.FAIL` / `TASK.ERROR` so the **task wizard
  UI** (modal dialog registered in `task/taskMap.ts`) can react. The `key.task`
  field routes responses to the matching task reducer in `reducers/tasks/`.

Both carry `{taskLabel, call: {name, payload}}` where `call` is a command from
the `Commands` type. The command object passes through Redux (from the
dispatching component, through the store, into the saga), so it **must contain
only serializable data** — no functions, no io-ts codecs, no class instances.
This is a fundamental Redux constraint and it affects where runtime objects
(like io-ts codecs for response validation) can live: they stay in the backend
layer, not in actions or the store.

Note: `LIB.CALL.CLUSTER.TASK` is designed for task wizard flows. For loading
data into cluster storage, use dedicated actions instead — see
[Techniques](#data-loading-with-dedicated-actions) below.

## Techniques

Patterns for specific situations that arise from the concepts above. Read when
you encounter the described situation during implementation.

### Data loading with dedicated actions

*When: a feature needs to load data from a library command and store it in
cluster storage, not in a task wizard.*

The preferred pattern is a set of dedicated actions with a matching saga —
rather than reusing `LIB.CALL.CLUSTER.TASK`. Established example:
`RESOURCE_AGENT.LOAD` / `.LOAD.SUCCESS` / `.LOAD.FAILED` with a saga in
`sagas/resourceAgent.ts`.

Key properties of this pattern:
- The saga calls `libCallCluster` directly, handling errors and dispatching
  typed success/failure actions.
- The reducer listens for the dedicated action types — no runtime command-name
  filtering needed.
- Action payloads carry only the data relevant to the feature, not the raw
  command envelope.
- Full type safety: action names are checked at dispatch sites, no string
  constants needed.
