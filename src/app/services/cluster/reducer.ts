import { combineReducers, Reducer } from "redux";

import {
  createDataFetchReducer,
  createDataFetchSelector,
} from "app/services/data-load/initial-fetch-reducer";
import {
  AuthRequired,
  AUTH_REQUIRED,
} from "app/services/auth/constants";

import {
  ClusterState,
  ClusterServiceState,
  FetchClusterDataSuccessAction,
  CLUSTER_STATUS,
  FETCH_CLUSTER_DATA_SUCCESS,
  SYNC_CLUSTER_DATA,
  FETCH_CLUSTER_DATA_FAILED,
} from "./types";
import clusterApiToState from "./apiToState";

const clusterStatusDefault: ClusterState = {
  name: "",
  urlName: "",
  status: CLUSTER_STATUS.UNKNOWN,
  nodeList: [],
  resourceList: [],
  fenceDeviceList: [],
  issueList: [],
};

const clusterState: Reducer<ClusterState> = (
  state = clusterStatusDefault,
  action: FetchClusterDataSuccessAction|AuthRequired,
) => {
  switch (action.type) {
    case FETCH_CLUSTER_DATA_SUCCESS:
      return clusterApiToState(action.payload.apiClusterStatus);
    case AUTH_REQUIRED: return clusterStatusDefault;
    default: return state;
  }
};

export default combineReducers({
  clusterState,
  dataFetch: createDataFetchReducer({
    START: SYNC_CLUSTER_DATA,
    SUCCESS: FETCH_CLUSTER_DATA_SUCCESS,
    FAIL: FETCH_CLUSTER_DATA_FAILED,
  }),
});


export const areDataLoaded = (state: ClusterServiceState) => (
  createDataFetchSelector(cs => cs.dataFetch)(state).isSuccess
);

export const getCluster = (state: ClusterServiceState) => state.clusterState;
