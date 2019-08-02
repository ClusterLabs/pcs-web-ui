export enum ClusterActionType {
  FETCH_CLUSTER_DATA_SUCCESS = "/cluster/FETCH_CLUSTER_DATA_SUCCESS",
  REFRESH_CLUSTER_DATA = "/cluster/REFRESH_CLUSTER_DATA",
  SYNC_CLUSTER_DATA = "/cluster/SYNC_CLUSTER_DATA",
  SYNC_CLUSTER_DATA_STOP = "/cluster/SYNC_CLUSTER_DATA_STOP",
  FETCH_CLUSTER_DATA_FAILED = "/cluster/FETCH_CLUSTER_DATA_FAILED",
}

export enum NODE_QUORUM {
  YES = "cluster/node/quorum/yes",
  NO = "cluster/node/quorum/no",
  UNKNOWN = "cluster/node/quorum/unknown",
}

export enum NODE_STATUS {
  ONLINE = "cluster/node/status/online",
  OFFLINE = "cluster/node/status/offline",
  UNKNOWN = "cluster/node/status/unknown",
}

export enum RESOURCE_STATUS {
  RUNNING = "cluster/resource/status/running",
  BLOCKED = "cluster/resource/status/blocked",
  FAILED = "cluster/resource/status/failed",
  UNKNOWN = "cluster/resource/status/unknown",
}

export enum FENCE_DEVICE_STATUS {
  RUNNING = "cluster/resource/status/running",
  BLOCKED = "cluster/resource/status/blocked",
  FAILED = "cluster/resource/status/failed",
  UNKNOWN = "cluster/resource/status/unknown",
}

export enum CLUSTER_STATUS {
  OK = "cluster/status/ok",
  WARNING = "cluster/status/warning",
  ERROR = "cluster/status/error",
  UNKNOWN = "cluster/status/unknown",
}

export enum ISSUE {
  ERROR = "cluster/issue/error",
  WARNING = "cluster/issue/warning",
}

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

export enum FETCH_STATUS {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface ClusterServiceState {
  clusterState: ClusterState,
  dataFetchState: FETCH_STATUS,
}
