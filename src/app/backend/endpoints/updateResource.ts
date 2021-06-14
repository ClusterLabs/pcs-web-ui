import * as t from "io-ts";

import { endpoint } from "./endpoint";

export const updateResource = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/update_resource`,
  method: "post",
  params: undefined,
  shape: t.partial({
    error: t.literal("true"),
    stdout: t.string,
    stderr: t.string,
  }),
});
