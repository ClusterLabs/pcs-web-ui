import { ApiNode } from "app/backend/types/clusterOverview";

import { apiToState as clusterApiToState, types } from "../../cluster";


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
  nodesSeverity: apiNodeList.reduce<types.StatusSeverity>(
    (lastMaxSeverity, node) => clusterApiToState.maxStatusSeverity(
      lastMaxSeverity,
      clusterApiToState.nodeToSeverity(node.status, node.quorum),
    ),
    "OK",
  ),
});
