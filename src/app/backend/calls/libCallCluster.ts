import {
  LibClusterCommands as Commands,
  api,
  endpoints,
  http,
} from "app/backend/tools";

const { shape } = endpoints.libCluster;

type InputPayload = ReturnType<typeof JSON.parse>;
type LibResult = api.CallResult<typeof shape>;

const libCall = async (url: string, payload: InputPayload): LibResult =>
  http.post(url, { payload, shape });

export const libCallCluster = async ({
  clusterName,
  command,
  payload,
}: {
  clusterName: string;
  command: keyof Commands;
  payload: { [K in keyof Commands]: Commands[K] }[keyof Commands];
}): LibResult => {
  return libCall(endpoints.libCluster.url({ clusterName, command }), payload);
};
