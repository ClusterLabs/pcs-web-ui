import { ApiClusterStatus } from "app/common/backend/clusterStatusTypes";

import { ClusterState } from "../types";
import { transformIssues } from "./issues";
import { processApiNodes } from "./nodes";
import { analyzeApiResources } from "./resources";

const transformStatus = (
  status: ApiClusterStatus["status"],
): ClusterState["status"] => {
  switch (status) {
    case "ok": return "OK";
    case "warning": return "WARNING";
    case "error": return "ERROR";
    default: return "UNKNOWN";
  }
};

const issuesToSummarySeverity = (
  apiClusterStatus: ApiClusterStatus,
): ClusterState["summary"]["issuesSeverity"] => {
  if (apiClusterStatus.error_list.length > 0) {
    return "ERROR";
  }
  if (apiClusterStatus.warning_list.length > 0) {
    return "WARNING";
  }
  return "OK";
};

const apiToState = (apiClusterStatus: ApiClusterStatus): ClusterState => {
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
      issuesSeverity: issuesToSummarySeverity(apiClusterStatus),
    },
  };
};

export default apiToState;
