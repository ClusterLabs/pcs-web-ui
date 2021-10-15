import * as t from "io-ts";

import { endpoint } from "./endpoint";

type Node = {
  password: string;
  dest_list: { addr: string; port: string }[];
};

export const authGuiAgainstNodes = endpoint({
  url: "/manage/auth_gui_against_nodes",
  method: "post",
  params: (nodeMap: Record<string, Node>): [string, string][] => [
    ["data_json", JSON.stringify({ nodes: nodeMap })],
  ],
  payload: undefined,
  shape: t.intersection([
    t.type({
      plaintext_error: t.string,
    }),
    t.partial({
      node_auth_error: t.record(
        t.string,
        t.union([t.literal(0), t.literal(1)]),
      ),
      local_cluster_node_auth_error: t.record(t.string, t.literal(1)),
    }),
  ]),
});
