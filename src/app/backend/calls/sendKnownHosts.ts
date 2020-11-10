import { api, http } from "app/backend/tools";

export const sendKnownHosts = async (
  clusterUrlName: string,
  nodeList: string[],
): api.CallResult => {
  const uniqueNodeList = Array.from(new Set(nodeList));

  return http.post(`/managec/${clusterUrlName}/send-known-hosts`, {
    params: uniqueNodeList.map(node => ["node_names[]", node]),
  });
};
