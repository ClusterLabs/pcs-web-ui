import { CallResult, endpoints, http } from "./tools";

const { url } = endpoints.clusterStop;

export const clusterStop = async (
  clusterName: string,
  nodeName: string | undefined = undefined,
): CallResult =>
  http.post(url({ clusterName }), {
    params: [nodeName !== undefined ? ["name", nodeName] : ["all", "1"]],
  });
