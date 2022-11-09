import {CallResult, endpoints, http} from "./tools";

const {url} = endpoints.clusterStart;
export const clusterStart = async (
  clusterName: string,
  nodeName: string | undefined = undefined,
): CallResult =>
  http.post(url({clusterName}), {
    params: [nodeName !== undefined ? ["name", nodeName] : ["all", "1"]],
  });
