import { api } from "app/backend";
import * as types from "app/store/state/types";

import { transformIssues } from "./issues";
import { processApiNodes } from "./nodes";
import { analyzeApiResources } from "./resources";

type ApiClusterStatus = api.types.clusterStatus.ApiClusterStatus;
type ApiIssue = api.types.clusterStatus.ApiIssue;
type ClusterState = types.cluster.ClusterStatus;

const issuesToSummarySeverity = (
  errorList: ApiIssue[],
  warningList: ApiIssue[],
): ClusterState["summary"]["issuesSeverity"] => {
  if (errorList.length > 0) {
    return "ERROR";
  }
  if (warningList.length > 0) {
    return "WARNING";
  }
  return "OK";
};

export const apiToState = (
  apiClusterStatus: ApiClusterStatus,
): ClusterState => {
  const {
    resourceTree,
    resourcesSeverity,
    fenceDeviceList,
    fenceDevicesSeverity,
    resourceOnNodeStatusList,
  } = analyzeApiResources(apiClusterStatus.resource_list);
  const { nodeList, nodesSeverity } = processApiNodes(
    apiClusterStatus.node_list,
  );
  return {
    name: apiClusterStatus.cluster_name,
    urlName: apiClusterStatus.cluster_name,
    nodeList,
    issueList: transformIssues(apiClusterStatus),
    resourceTree,
    fenceDeviceList,
    constraints: apiClusterStatus.constraints,
    resourceOnNodeStatusList,
    summary: {
      resourcesSeverity,
      fenceDevicesSeverity,
      nodesSeverity,
      issuesSeverity: issuesToSummarySeverity(
        apiClusterStatus.error_list,
        apiClusterStatus.warning_list,
      ),
    },
    nodeAttr: apiClusterStatus.node_attr ?? {},
    nodesUtilization: apiClusterStatus.nodes_utilization ?? {},
  };
};
