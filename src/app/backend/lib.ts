import {
  LibClusterCommands as Commands,
  endpoints,
} from "app/backend/endpoints";

import { CallResult } from "./call";
import { post } from "./http";

const { shape } = endpoints.libCluster;

type InputPayload = ReturnType<typeof JSON.parse>;
type LibResult = CallResult<typeof shape>;

export const call = async (url: string, payload: InputPayload): LibResult =>
  post(url, { payload, shape });

export const callCluster = async ({
  clusterName,
  command,
  payload,
}: {
  clusterName: string;
  command: keyof Commands;
  payload: { [K in keyof Commands]: Commands[K] }[keyof Commands];
}): LibResult => {
  return call(endpoints.libCluster.url({ clusterName, command }), payload);
};
