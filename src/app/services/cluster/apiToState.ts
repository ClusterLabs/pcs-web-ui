import {
  ApiClusterStatus,
  ApiClusterStatusFlag,
  ApiIssue,
  ApiNodeStatus,
  ApiQuorum,
  ApiResourceStatus,
  ApiWithIssues,
} from "app/backend/clusterStatusTypes";

import {
  ClusterState,
  CLUSTER_STATUS,
  FENCE_DEVICE_STATUS,
  ISSUE,
  NODE_QUORUM,
  NODE_STATUS,
  RESOURCE_STATUS,
} from "./types";

const mapClusterStatus = (status: ApiClusterStatusFlag): CLUSTER_STATUS => {
  switch (status) {
    case "ok": return "OK";
    case "warning": return "WARNING";
    case "error": return "ERROR";
    default: return "UNKNOWN";
  }
};

const mapNodeQuorum = (quorum: ApiQuorum): NODE_QUORUM => {
  switch (quorum) {
    case true: return "YES";
    case false: return "NO";
    default: return "UNKNOWN";
  }
};

const mapNodeStatus = (status: ApiNodeStatus): NODE_STATUS => {
  switch (status) {
    case "online": return "ONLINE";
    case "offline": return "OFFLINE";
    default: return "UNKNOWN";
  }
};

const mapResourceStatus = (status: ApiResourceStatus): RESOURCE_STATUS => {
  switch (status) {
    case "running": return "RUNNING";
    case "blocked": return "BLOCKED";
    case "failed": return "FAILED";
    default: return "UNKNOWN";
  }
};

const mapFenceDeviceStatus = (
  status: ApiResourceStatus,
): FENCE_DEVICE_STATUS => {
  switch (status) {
    case "running": return "RUNNING";
    case "blocked": return "BLOCKED";
    case "failed": return "FAILED";
    default: return "UNKNOWN";
  }
};

const mapIssue = (severity: ISSUE) => (issue: ApiIssue) => ({
  severity,
  message: issue.message,
});

const transformIssues = (element: ApiWithIssues) => [
  ...element.error_list.map(mapIssue("ERROR")),
  ...element.warning_list.map(mapIssue("WARNING")),
];

const apiToState = (apiClusterStatus: ApiClusterStatus): ClusterState => ({
  name: apiClusterStatus.cluster_name,
  urlName: apiClusterStatus.cluster_name,
  status: mapClusterStatus(apiClusterStatus.status),
  nodeList: apiClusterStatus.node_list.map(apiNode => ({
    name: apiNode.name,
    status: mapNodeStatus(apiNode.status),
    quorum: mapNodeQuorum(apiNode.quorum),
    issueList: transformIssues(apiNode),
  })),
  issueList: transformIssues(apiClusterStatus),
  resourceList: apiClusterStatus.resource_list
    .filter(apiResource => !apiResource.stonith)
    .map(apiResource => ({
      id: apiResource.id,
      status: mapResourceStatus(apiResource.status),
      issueList: transformIssues(apiResource),
    })),
  fenceDeviceList: apiClusterStatus.resource_list
    .filter(apiFenceDevice => apiFenceDevice.stonith)
    .map(apiFenceDevice => ({
      id: apiFenceDevice.id,
      status: mapFenceDeviceStatus(apiFenceDevice.status),
      issueList: transformIssues(apiFenceDevice),
    }))
  ,
});

export default apiToState;
