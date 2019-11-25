import { ApiNode } from "app/common/backend/types/clusterOverview";
import { apiToState as clusterApiToState } from "app/services/cluster";
import { statusSeverity } from "app/common/utils";
import { StatusSeverity } from "app/common/types";


const toNode = (apiNode: ApiNode) => ({
  name: apiNode.name,
  status: clusterApiToState.nodeMapStatus(apiNode.status),
  statusSeverity: clusterApiToState.nodeStatusToSeverity(apiNode.status),
  quorum: clusterApiToState.nodeMapQuorum(apiNode.quorum),
  quorumSeverity: clusterApiToState.nodeQuorumToSeverity(apiNode.quorum),
  issueList: clusterApiToState.transformIssues(apiNode),
});

export const processApiNodes = (apiNodeList: ApiNode[]) => ({
  nodeList: apiNodeList.map(toNode),
  nodesSeverity: apiNodeList.reduce<StatusSeverity>(
    (lastMaxSeverity, node) => statusSeverity.max(
      lastMaxSeverity,
      clusterApiToState.nodeToSeverity(node.status, node.quorum),
    ),
    "OK",
  ),
});
