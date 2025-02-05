import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.removeCluster;

export const removeCluster = async (clusterName: string): CallResult =>
  http.post(url, {
    params: [[`clusterid-${clusterName}`, "true"]],
  });
