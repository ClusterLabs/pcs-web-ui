export enum ClusterActionType {
  FETCH_CLUSTER_DATA_SUCCESS = "/cluster/FETCH_CLUSTER_DATA_SUCCESS",
  REFRESH_CLUSTER_DATA = "/cluster/REFRESH_CLUSTER_DATA",
  SYNC_CLUSTER_DATA = "/cluster/SYNC_CLUSTER_DATA",
  SYNC_CLUSTER_DATA_STOP = "/cluster/SYNC_CLUSTER_DATA_STOP",
  FETCH_CLUSTER_DATA_FAILED = "/cluster/FETCH_CLUSTER_DATA_FAILED",
}

export type NODE_QUORUM = "YES"|"NO"|"UNKNOWN";
export type NODE_STATUS = "ONLINE"|"OFFLINE"|"UNKNOWN";
export type RESOURCE_STATUS = "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN";
export type FENCE_DEVICE_STATUS = "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN";
export type CLUSTER_STATUS = "OK"|"WARNING"|"ERROR"|"UNKNOWN";
export type ISSUE = "ERROR"|"WARNING";

export interface Issue {
  severity: ISSUE,
  message: string,
}

export interface Node {
  name: string,
  status: NODE_STATUS,
  quorum: NODE_QUORUM,
  issueList: Issue[],
}

export interface Resource {
  id: string,
  status: RESOURCE_STATUS,
  issueList: Issue[],
}

export interface FenceDevice {
  id: string,
  status: FENCE_DEVICE_STATUS,
  issueList: Issue[],
}

export interface ClusterState {
  name: string,
  urlName: string,
  status: CLUSTER_STATUS,
  nodeList: Node[],
  resourceList: Resource[],
  fenceDeviceList: FenceDevice[],
  issueList: Issue[],
}

export type FETCH_STATUS = "NOT_STARTED"|"IN_PROGRESS"|"SUCCESS"|"ERROR";

export interface ClusterServiceState {
  clusterState: ClusterState,
  dataFetchState: FETCH_STATUS,
}
