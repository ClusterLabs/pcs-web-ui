import * as types from "./constants"

export const syncClusterData = (clusterName) => ({
  type: types.SYNC_CLUSTER_DATA,
  payload: {clusterName},
});

export const fetchClusterDataSuccess = (clusterData) => ({
  type: types.FETCH_CLUSTER_DATA_SUCCESS,
  payload: clusterData,
});

export const syncClusterDataStop = () => ({
  type: types.SYNC_CLUSTER_DATA_STOP,
});
