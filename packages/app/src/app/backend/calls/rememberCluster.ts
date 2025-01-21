import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.rememberCluster;
type Params = Parameters<typeof params>[0];
export const rememberCluster = async ({
  clusterName,
  nodeNameList,
}: {
  clusterName: Params["clusterName"];
  nodeNameList: Params["nodeNameList"];
}): CallResult => http.post(url, {params: params({clusterName, nodeNameList})});
