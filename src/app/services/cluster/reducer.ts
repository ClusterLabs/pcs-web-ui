import { combineReducers, Reducer } from "redux";

import { AuthRequired, AUTH_REQUIRED } from "app/services/auth/constants";

import {
  ClusterState,
  ClusterServiceState,
  FetchClusterDataSuccessAction,
  FetchClusterDataFailedAction,
  SyncClusterDataAction,
  CLUSTER_STATUS,
  FETCH_CLUSTER_DATA_SUCCESS,
  SYNC_CLUSTER_DATA,
  FETCH_CLUSTER_DATA_FAILED,
  FETCH_STATUS,
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

const dataFetchState: Reducer<FETCH_STATUS> = (
  state = FETCH_STATUS.NOT_STARTED,
  action: (
    |SyncClusterDataAction
    |FetchClusterDataSuccessAction
    |FetchClusterDataFailedAction
    |AuthRequired
  ),
) => {
  switch (action.type) {
    case SYNC_CLUSTER_DATA: return FETCH_STATUS.IN_PROGRESS;
    case FETCH_CLUSTER_DATA_SUCCESS: return FETCH_STATUS.SUCCESS;
    case FETCH_CLUSTER_DATA_FAILED: return (
      state === FETCH_STATUS.IN_PROGRESS
        ? FETCH_STATUS.ERROR
        : state
    );
    case AUTH_REQUIRED: return FETCH_STATUS.NOT_STARTED;
    default: return state;
  }
};

export default combineReducers<ClusterServiceState>({
  clusterState,
  dataFetchState,
});

export const areDataLoaded = (state: ClusterServiceState) => (
  state.dataFetchState === FETCH_STATUS.SUCCESS
);

export const getCluster = (state: ClusterServiceState) => state.clusterState;
