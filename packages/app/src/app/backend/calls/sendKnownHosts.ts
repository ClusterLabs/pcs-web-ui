import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.sendKnownHosts;

export const sendKnownHosts = async (nodeList: string[]): CallResult => {
  const uniqueNodeList = Array.from(new Set(nodeList));

  return http.post(url, {
    params: uniqueNodeList.map(node => ["node_names[]", node]),
  });
};
