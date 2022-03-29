import { endpoint } from "./endpoint";

export const setNodeUtilization = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/set_node_utilization`,
  method: "post",
  params: ({
    nodeName,
    name,
    value,
  }: {
    nodeName: string;
    name: string;
    value: string;
  }): [string, string][] => [
    ["node", nodeName],
    ["name", name],
    ["value", value],
  ],
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
