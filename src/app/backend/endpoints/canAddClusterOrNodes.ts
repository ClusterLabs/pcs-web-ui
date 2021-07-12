import { endpoint } from "./endpoint";

export const canAddClusterOrNodes = endpoint({
  url: "/manage/can-add-cluster-or-nodes",
  method: "get",
  params: (checkParams: {
    clusterName?: string;
    nodeNames?: string[];
  }): [string, string][] =>
    [
      ...("clusterName" in checkParams && checkParams.clusterName
        ? [["cluster", checkParams.clusterName]]
        : []),
      ...(checkParams.nodeNames || []).map(name => ["node_names[]", name]),
    ] as [string, string][],
  shape: undefined,
});
