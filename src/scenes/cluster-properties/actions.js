import * as types from "./constants"

export const fetchClusterProperties = (clusterName) => ({
  type: types.FETCH_CLUSTER_PROPERTIES,
  payload: {clusterName},
});

export const fetchClusterPropertiesSuccess = (properties) => ({
  type: types.FETCH_CLUSTER_PROPERTIES_SUCCESS,
  payload: properties,
});

export const fetchClusterPropertiesFailed = (error) => ({
  type: types.FETCH_CLUSTER_PROPERTIES_FAILED,
  payload: error,
});
