import { ApiClusterStatus } from "app/common/backend/clusterStatusTypes";

export interface FetchClusterDataSuccess {
  type: "CLUSTER_DATA.FETCH.SUCCESS",
  payload: {
    apiClusterStatus: ApiClusterStatus,
  },
}

export interface FetchClusterDataFailed{
  type: "CLUSTER_DATA.FETCH.FAILED",
}

export interface RefreshClusterData {
  type: "CLUSTER_DATA.REFRESH",
}

export interface SyncClusterDataPayload {
  clusterUrlName: string,
}

export interface SyncClusterData {
  type: "CLUSTER_DATA.SYNC",
  payload: SyncClusterDataPayload,
}

export interface SyncClusterDataStop {
  type: "CLUSTER_DATA.SYNC.STOP",
}
