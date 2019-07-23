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
  ClusterStatus,
  CLUSTER_STATUS,
  FENCE_DEVICE_STATUS,
  ISSUE,
  NODE_QUORUM,
  NODE_STATUS,
  RESOURCE_STATUS,
} from "./types";

const mapClusterStatus = (status: ApiClusterStatusFlag) => {
  switch (status) {
    case "ok": return CLUSTER_STATUS.OK;
    case "warning": return CLUSTER_STATUS.WARNING;
    case "error": return CLUSTER_STATUS.ERROR;
    default: return CLUSTER_STATUS.UNKNOWN;
  }
};

const mapNodeQuorum = (quorum: ApiQuorum): NODE_QUORUM => {
  switch (quorum) {
    case true: return NODE_QUORUM.YES;
    case false: return NODE_QUORUM.NO;
    default: return NODE_QUORUM.UNKNOWN;
  }
};

const mapNodeStatus = (status: ApiNodeStatus): NODE_STATUS => {
  switch (status) {
    case "online": return NODE_STATUS.ONLINE;
    case "offline": return NODE_STATUS.OFFLINE;
    default: return NODE_STATUS.UNKNOWN;
  }
};

const mapResourceStatus = (status: ApiResourceStatus): RESOURCE_STATUS => {
  switch (status) {
    case "running": return RESOURCE_STATUS.RUNNING;
    case "blocked": return RESOURCE_STATUS.BLOCKED;
    case "failed": return RESOURCE_STATUS.FAILED;
    default: return RESOURCE_STATUS.UNKNOWN;
  }
};

const mapFenceDeviceStatus = (
  status: ApiResourceStatus,
): FENCE_DEVICE_STATUS => {
  switch (status) {
    case "running": return FENCE_DEVICE_STATUS.RUNNING;
    case "blocked": return FENCE_DEVICE_STATUS.BLOCKED;
    case "failed": return FENCE_DEVICE_STATUS.FAILED;
    default: return FENCE_DEVICE_STATUS.UNKNOWN;
  }
};

const mapIssue = (severity: ISSUE) => (issue: ApiIssue) => ({
  severity,
  message: issue.message,
});

const transformIssues = (element: ApiWithIssues) => [
  ...element.error_list.map(mapIssue(ISSUE.ERROR)),
  ...element.warning_list.map(mapIssue(ISSUE.WARNING)),
];

const apiToState = (apiClusterStatus: ApiClusterStatus): ClusterStatus => ({
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
