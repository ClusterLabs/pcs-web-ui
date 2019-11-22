import {
  ApiClusterStatus,
  ApiIssue,
} from "app/common/backend/types/clusterStatus";

import { ClusterState } from "../types";
import { transformIssues } from "./issues";
import { processApiNodes } from "./nodes";
import { analyzeApiResources } from "./resources";

export const transformStatus = (
  status: ApiClusterStatus["status"],
): ClusterState["status"] => {
  switch (status) {
    case "ok": return "OK";
    case "warning": return "WARNING";
    case "error": return "ERROR";
    default: return "UNKNOWN";
  }
};

export const issuesToSummarySeverity = (
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
  } = analyzeApiResources(apiClusterStatus.resource_list);
  const {
    nodeList,
    nodesSeverity,
  } = processApiNodes(apiClusterStatus.node_list);
  return {
    name: apiClusterStatus.cluster_name,
    urlName: apiClusterStatus.cluster_name,
    status: transformStatus(apiClusterStatus.status),
    nodeList,
    issueList: transformIssues(apiClusterStatus),
    resourceTree,
    fenceDeviceList,
    summary: {
      resourcesSeverity,
      fenceDevicesSeverity,
      nodesSeverity,
      issuesSeverity: issuesToSummarySeverity(
        apiClusterStatus.error_list,
        apiClusterStatus.warning_list,
      ),
    },
  };
};
