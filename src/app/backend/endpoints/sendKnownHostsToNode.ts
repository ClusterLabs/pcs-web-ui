import { endpoint } from "./endpoint";

export const sendKnownHostsToNode = endpoint({
  url: "/manage/send-known-hosts-to-node",
  method: "post",
  params: ({
    nodeList,
    targetNode,
  }: {
    nodeList: string[];
    targetNode: string;
  }): [string, string][] => [
    ...nodeList.map(node => ["node_names[]", node] as [string, string]),
    ["target_node", targetNode],
  ],
  shape: undefined,
});
