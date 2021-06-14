import * as t from "io-ts";

import { endpoint } from "./endpoint";

export const resourceCleanup = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/resource_cleanup`,
  method: "post",
  params: undefined,
  shape: t.union([
    t.type({ success: t.literal("true") }),
    t.type({
      error: t.literal("true"),
      stdout: t.string,
      stderror: t.string,
    }),
  ]),
});
