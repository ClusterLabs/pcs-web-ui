import { endpoint } from "./endpoint";

export const sendKnownHostsToNode = endpoint({
  url: "/manage/send-known-hosts-to-node",
  method: "post",
  params: ({
    nodeNameList,
    targetNode,
  }: {
    nodeNameList: string[];
    targetNode: string;
  }): [string, string][] => [
    ...nodeNameList.map(node => ["node_names[]", node] as [string, string]),
    ["target_node", targetNode],
  ],
  payload: undefined,
  shape: undefined,
});
