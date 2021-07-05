import { endpoint } from "app/backend/endpoints/endpoint";

import { shape } from "../shape";

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
  params: undefined,
  shape,
});
