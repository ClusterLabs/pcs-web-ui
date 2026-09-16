import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.destroyCluster;

export const destroyCluster = (): CallResult =>
  http.post(url, {params: [["all", "1"]]});
