import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.canAddClusterOrNodes;

export const canAddClusterOrNodes = async (
  checkParams: Parameters<typeof params>[0],
): CallResult => http.get(url, {params: params(checkParams)});
