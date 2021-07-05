import { CallResult, endpoints, http } from "./tools";

const { url, params } = endpoints.sendKnownHostsToNode;
type Params = Parameters<typeof params>[0];
export const sendKnownHostsToNode = async ({
  nodeList,
  targetNode,
}: {
  nodeList: Params["nodeList"];
  targetNode: Params["targetNode"];
}): CallResult => http.post(url, { params: params({ nodeList, targetNode }) });
