import {CallResult, endpoints, http} from "./tools";

const {url} = endpoints.destroyCluster;

export const destroyCluster = (clusterName: string): CallResult =>
  http.post(url({clusterName}), {
    params: [["all", "1"]],
  });
