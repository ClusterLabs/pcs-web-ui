import type {LibClusterCommands} from "app/backend/endpoints";

import {type CallResult, endpoints, http} from "./tools";

const {shape, url} = endpoints.libCluster;

export const libCallCluster = async ({
  command,
}: {
  command: LibClusterCommands[number];
}): CallResult<ReturnType<typeof shape>> => {
  return http.post(url({command: command.name}), {
    payload: command.payload,
    shape: shape(command.name),
  });
};
