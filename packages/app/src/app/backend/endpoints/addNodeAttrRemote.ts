import {endpoint} from "./endpoint";

export const addNodeAttrRemote = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/add_node_attr_remote`,
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
    ["key", name],
    ["value", value],
  ],
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
