import * as t from "io-ts";

import {endpoint} from "./endpoint";
import {updateResourceParams} from "./tools";

export const updateResource = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/update_resource`,
  method: "post",
  params: updateResourceParams,
  payload: undefined,
  validate: undefined,
  shape: t.union([
    t.type({}),
    t.type({
      error: t.literal("true"),
      stdout: t.string,
      stderr: t.string,
    }),
  ]),
});
