import { combineReducers } from "redux";

import { createDataFetchReducer, createDataFetchSelector }
  from "app/services/data-load/initial-fetch-reducer";

import * as authTypes from "app/services/auth/constants";

import * as types from "./constants";

const clusterStatusDefaultState = {
  name: "",
  nodeList: [],
  resourceList: [],
  fenceDeviceList: [],
};

const clusterStatus = (state = clusterStatusDefaultState, action) => {
  switch (action.type) {
    case types.FETCH_CLUSTER_DATA_SUCCESS: return action.payload;
    case authTypes.AUTH_REQUIRED: return clusterStatusDefaultState;
    default: return state;
  }
};

export default combineReducers({
  clusterStatus,
  dataFetch: createDataFetchReducer({
    START: types.SYNC_CLUSTER_DATA,
    SUCCESS: types.FETCH_CLUSTER_DATA_SUCCESS,
    FAIL: types.FETCH_CLUSTER_DATA_FAILED,
  }),
});


export const areDataLoaded = state => (
  createDataFetchSelector(clusterState => clusterState.dataFetch)(state)
    .isSuccess
);

export const getCluster = state => state.clusterStatus;
