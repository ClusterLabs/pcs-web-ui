import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.clusterStart;
export const clusterStart = async (
  nodeName: string | undefined = undefined,
): CallResult =>
  http.post(url, {
    params: [nodeName !== undefined ? ["name", nodeName] : ["all", "1"]],
  });
