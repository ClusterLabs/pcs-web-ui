import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.existingCluster;
export const existingCluster = async (nodeName: string): CallResult =>
  http.post(url, {params: [["node-name", nodeName]]});
