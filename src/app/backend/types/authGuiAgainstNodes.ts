import * as t from "io-ts";

export const TApiAuthGuiAgainstNodes = t.type({
  node_auth_error: t.record(t.string, t.union([t.literal(0), t.literal(1)])),
});

export type ApiAuthGuiAgainstNodes = t.TypeOf<typeof TApiAuthGuiAgainstNodes>;
