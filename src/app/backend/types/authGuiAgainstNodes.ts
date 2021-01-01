import * as t from "io-ts";

export const TApiAuthGuiAgainstNodes = t.intersection([
  t.type({
    plaintext_error: t.string,
  }),
  t.partial({
    node_auth_error: t.record(t.string, t.union([t.literal(0), t.literal(1)])),
    local_cluster_node_auth_error: t.record(t.string, t.literal(1)),
  }),
]);

export type ApiAuthGuiAgainstNodes = t.TypeOf<typeof TApiAuthGuiAgainstNodes>;
