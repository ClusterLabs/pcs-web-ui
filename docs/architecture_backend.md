# Backend layer

Source: `packages/app/src/app/backend/`

Handles all communication with the pcsd backend. All HTTP goes through
`pcsUiEnvAdapter.request()`, keeping the layer
[mode](architecture.md#two-deployment-modes)-agnostic. The layer is
split into two parts that separate what is expected from how it is called:

- **Endpoints** (`endpoints/`) define the HTTP contract: URL, method, io-ts
  shape for response validation, and optional payload builder. An endpoint is
  pure data — it does not perform I/O. Endpoints that talk to the pcs library
  API use a shared envelope codec (`endpoints/lib/shape.ts`) that wraps the
  command-specific data with standard fields (`status`, `report_list`,
  `status_msg`).

- **Call functions** (`calls/`) perform the actual HTTP request. Each call
  function picks the URL, shape, and payload from an endpoint and passes them
  to the HTTP layer. The HTTP layer validates the response against the io-ts
  shape and returns a **discriminated union result**:
  `Ok<Payload> | InvalidPayload | HttpFail | NotJson`. Type helpers `ResultOf`
  and `PayloadOf` (in `api.ts`) extract the result and payload types from a
  call function — other layers use these instead of constructing result types
  manually.

## Library command mechanism (libCluster)

The most common way to call the pcs library API is through the **libCluster
mechanism**. Instead of defining a separate endpoint and call function for each
library command, it uses a single endpoint with a `Commands` type
(`endpoints/lib/cluster/libCluster.ts`) that defines all supported commands as a
tuple of `{name, payload}` objects.

`Commands` is a **pure TypeScript type** — it carries no runtime values. It
defines the HTTP contract (command name = URL suffix, payload = request body)
for each command. The io-ts codec for response validation is defined separately
at the endpoint level, because codecs are runtime objects (with `decode`,
`encode` methods) and cannot be part of a type definition.

A single call function `libCallCluster` (`calls/libCallCluster.ts`) handles all
commands — it takes a command object (`{name, payload}`) and posts it to the
appropriate URL, validating the response against the endpoint's io-ts shape.

All library command responses share a common envelope defined in
`endpoints/lib/shape.ts`: `{status, data, report_list, status_msg}`. The `data`
field carries command-specific output (or `null` for commands with no return
value). Commands that return data register an io-ts codec in
`commandDataCodecs` (in `libCluster.ts`), which maps command names to their
response codecs. The `CommandResponseData` type automatically derives the typed
data shape for each command — commands with a codec get the decoded type, others
get `null`. This separation keeps runtime validation objects apart from the pure
type definition (`Commands`).

This mechanism connects to the store layer through dedicated actions — see
[Library command actions](architecture_store.md#library-command-actions).
