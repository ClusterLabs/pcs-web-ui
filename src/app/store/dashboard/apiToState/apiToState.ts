import { ApiClusterStatus } from "app/backend/types/clusterOverview";
import { apiToState as clusterApiToState } from "../../cluster";
import { ClusterState } from "../types";
import { analyzeApiResources } from "./resources";

import { processApiNodes } from "./nodes";

export const apiToState = (
  apiClusterStatus: ApiClusterStatus,
): ClusterState => {
  const {
    resourceTree,
    resourcesSeverity,
    fenceDeviceList,
    fenceDevicesSeverity,
  } = analyzeApiResources(apiClusterStatus.resource_list);
  const {
    nodeList,
    nodesSeverity,
  } = processApiNodes(apiClusterStatus.node_list);
  return {
    name: apiClusterStatus.cluster_name,
    urlName: apiClusterStatus.cluster_name,
    status: clusterApiToState.clusterTransforStatus(apiClusterStatus.status),
    nodeList,
    issueList: clusterApiToState.transformIssues(apiClusterStatus),
    resourceTree,
    fenceDeviceList,
    summary: {
      resourcesSeverity,
      fenceDevicesSeverity,
      nodesSeverity,
      issuesSeverity: clusterApiToState.issuesToSummarySeverity(
        apiClusterStatus.error_list,
        apiClusterStatus.warning_list,
      ),
    },
  };
};
