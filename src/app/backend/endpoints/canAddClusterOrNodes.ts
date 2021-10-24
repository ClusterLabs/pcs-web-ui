import { endpoint } from "./endpoint";

type CheckParams = {
  clusterName?: string;
  nodeNames?: string[];
};

const clusterNameParams = (checkParams: CheckParams): [string, string][] =>
  "clusterName" in checkParams && checkParams.clusterName
    ? [["cluster", checkParams.clusterName]]
    : [];

const nodesParams = (checkParams: CheckParams): [string, string][] =>
  (checkParams.nodeNames || []).map(name => ["node_names[]", name]);

export const canAddClusterOrNodes = endpoint({
  url: "/manage/can-add-cluster-or-nodes",
  method: "get",
  params: (checkParams: CheckParams): [string, string][] => [
    ...clusterNameParams(checkParams),
    ...nodesParams(checkParams),
  ],
  payload: undefined,
  shape: undefined,
});
