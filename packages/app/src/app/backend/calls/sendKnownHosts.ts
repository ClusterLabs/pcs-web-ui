import {CallResult, endpoints, http} from "./tools";

const {url} = endpoints.sendKnownHosts;

export const sendKnownHosts = async (
  clusterName: string,
  nodeList: string[],
): CallResult => {
  const uniqueNodeList = Array.from(new Set(nodeList));

  return http.post(url({clusterName}), {
    params: uniqueNodeList.map(node => ["node_names[]", node]),
  });
};
