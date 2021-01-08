import * as t from "io-ts";

import { endpoint } from "./endpoint";

export const resourceRefresh = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/resource_refresh`,
  method: "post",
  shape: t.union([
    t.type({ success: t.literal("true") }),
    t.type({
      error: t.literal("true"),
      stdout: t.string,
      stderror: t.string,
    }),
  ]),
});
