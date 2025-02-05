import {type CallResult, endpoints, http} from "./tools";

const {shape, url, params} = endpoints.clusterSetup;

export const clusterSetup = async ({
  targetNode,
  setupData,
}: Parameters<typeof params>[0]): CallResult<typeof shape> =>
  http.post(url, {params: params({targetNode, setupData}), shape});
