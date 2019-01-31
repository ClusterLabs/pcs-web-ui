import { combineReducers } from "redux";

import { createDataFetchReducer, createDataFetchSelector }
  from "app/services/data-load/initial-fetch-reducer";

import * as types from "./constants";

const clusterStatusDefaultState = {
  name: "",
  nodeList: [],
  resourceList: [],
  stonithList: [],
};

const clusterStatus = (state = clusterStatusDefaultState, action) => {
  switch (action.type) {
    case types.FETCH_CLUSTER_DATA_SUCCESS: return action.payload;
    default: return state;
  }
};

export default combineReducers({
  clusterStatus,
  dataFetch: createDataFetchReducer({
    START: types.SYNC_CLUSTER_DATA,
    SUCCESS: types.FETCH_CLUSTER_DATA_SUCCESS,
    FAIL: types.FETCH_CLUSTER_DATA_SUCCESS,
  }),
});


export const getClusterDataFetch = createDataFetchSelector(
  state => state.cluster.dataFetch,
);

export const getCluster = state => state.cluster.clusterStatus;
