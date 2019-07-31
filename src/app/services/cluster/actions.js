import * as types from "./constants";

export const refreshClusterData = () => ({
  type: types.REFRESH_CLUSTER_DATA,
});

export const syncClusterData = clusterUrlName => ({
  type: types.SYNC_CLUSTER_DATA,
  payload: { clusterUrlName },
});

export const fetchClusterDataSuccess = apiClusterState => ({
  type: types.FETCH_CLUSTER_DATA_SUCCESS,
  payload: { apiClusterState },
});

export const fetchClusterDataFailed = error => ({
  type: types.FETCH_CLUSTER_DATA_FAILED,
  payload: error,
});

export const syncClusterDataStop = () => ({
  type: types.SYNC_CLUSTER_DATA_STOP,
});
