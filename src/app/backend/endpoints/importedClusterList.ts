import * as t from "io-ts";

import { endpoint } from "./endpoint";

export const importedClusterList = endpoint({
  url: "/imported-cluster-list",
  method: "get",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape: t.type({
    cluster_list: t.array(
      t.type({
        name: t.string,
      }),
    ),
  }),
});
