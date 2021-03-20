import { api } from "app/backend";

import { ClusterStatus } from "../types";

import { transformIssues } from "./issues";
import { processApiNodes } from "./nodes";
import { analyzeApiResources } from "./resources";

type ApiClusterStatus = api.clusterStatus.ClusterStatus;
type ApiIssue = api.clusterStatus.Issue;

const issuesToSummarySeverity = (
  errorList: ApiIssue[],
  warningList: ApiIssue[],
): ClusterStatus["summary"]["issuesSeverity"] => {
  if (errorList.length > 0) {
    return "ERROR";
  }
  if (warningList.length > 0) {
    return "WARNING";
  }
  return "OK";
};

const sbdDetection = (apiClusterState: ApiClusterStatus) =>
  apiClusterState.node_list.reduce<ClusterStatus["sbdDetection"]>(
    (sbd, node) =>
      node.status === "unknown"
        ? sbd
        : {
            enabled: (sbd !== null && sbd.enabled) || node.services.sbd.enabled,
          },
    null,
  );

export const apiToState = (
  apiClusterStatus: ApiClusterStatus,
): ClusterStatus => {
  const {
    resourceTree,
    resourcesSeverity,
    fenceDeviceList,
    fenceDevicesSeverity,
    resourceOnNodeStatusList,
  } = analyzeApiResources(apiClusterStatus.resource_list);
  const { nodeList, nodesSeverity } = processApiNodes(
    apiClusterStatus.node_list,
    apiClusterStatus.node_attr ?? {},
  );
  return {
    name: apiClusterStatus.cluster_name,
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
    sbdDetection: sbdDetection(apiClusterStatus),
  };
};
