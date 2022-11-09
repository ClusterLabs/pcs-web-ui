import {LibClusterCommands} from "app/backend/endpoints";

import {CallResult, endpoints, http} from "./tools";

const {shape, url} = endpoints.libCluster;

export const libCallCluster = async ({
  clusterName,
  command,
}: {
  clusterName: string;
  command: LibClusterCommands[number];
}): CallResult<typeof shape> => {
  return http.post(url({clusterName, command: command.name}), {
    payload: command.payload,
    shape,
  });
};
