import { ApiClusterStatus } from "app/backend/clusterStatusTypes";

import { ClusterActionType } from "./types";

export interface FetchClusterDataSuccess {
  type: typeof ClusterActionType.FETCH_CLUSTER_DATA_SUCCESS,
  payload: {
    apiClusterStatus: ApiClusterStatus,
  },
}

export interface FetchClusterDataFailed{
  type: typeof ClusterActionType.FETCH_CLUSTER_DATA_FAILED,
}

export interface RefreshClusterData {
  type: typeof ClusterActionType.REFRESH_CLUSTER_DATA,
}

export interface SyncClusterDataPayload {
  clusterUrlName: string,
}

export interface SyncClusterData {
  type: typeof ClusterActionType.SYNC_CLUSTER_DATA,
  payload: SyncClusterDataPayload,
}

export interface SyncClusterDataStop {
  type: typeof ClusterActionType.SYNC_CLUSTER_DATA_STOP,
}
