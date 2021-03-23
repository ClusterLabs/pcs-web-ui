import * as t from "io-ts";

import { endpoint } from "../endpoint";

import { LibClusterCommands } from "./commands";

export const libCluster = endpoint({
  url: ({
    clusterName,
    command,
  }: {
    clusterName: string;
    command: LibClusterCommands[number]["name"];
  }) => `/managec/${clusterName}/api/v1/${command}`,
  method: "post",
  shape: t.type({
    status: t.keyof({
      success: null,
      error: null,
      exception: null,
      input_error: null,
      unknown_cmd: null,
    }),
    status_msg: t.union([t.string, t.null]),
    report_list: t.array(
      t.type({
        severity: t.type({
          level: t.keyof({
            ERROR: null,
            WARNING: null,
            INFO: null,
            DEBUG: null,
          }),
          force_code: t.union([t.string, t.null]),
        }),
        message: t.type({
          code: t.string,
          message: t.string,
          payload: t.type({}),
        }),
        context: t.union([t.type({ node: t.string }), t.null]),
      }),
    ),
    data: t.any,
  }),
});
