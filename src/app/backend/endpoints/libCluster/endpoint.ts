import * as types from "app/backend/types";

import { endpoint } from "../endpoint";

import { LibClusterCommands } from "./commands";

const { TApiResponse: libShape } = types.lib;

export const libCluster = endpoint({
  url: ({
    clusterName,
    command,
  }: {
    clusterName: string;
    command: keyof LibClusterCommands;
  }) => `/managec/${clusterName}/api/v1/${command}/v1`,
  method: "post",
  shape: libShape,
});
