import { combineReducers, Reducer } from "redux";

import { AuthActionType } from "app/services/auth/types";
import * as AuthAction from "app/services/auth/actions";

import {
  ClusterActionType,
  ClusterState,
  ClusterServiceState,
  CLUSTER_STATUS,
  FETCH_STATUS,
} from "./types";
import * as ClusterAction from "./actions";
import clusterApiToState from "./apiToState";

const clusterStatusDefault = {
  name: "",
  urlName: "",
  status: CLUSTER_STATUS.UNKNOWN,
  nodeList: [],
  resourceList: [],
  fenceDeviceList: [],
  issueList: [],
};

const clusterState: Reducer<ClusterState, (
  |ClusterAction.FetchClusterDataSuccess
  |AuthAction.AuthRequired
)> = (state = clusterStatusDefault, action) => {
  switch (action.type) {
    case ClusterActionType.FETCH_CLUSTER_DATA_SUCCESS:
      return clusterApiToState(action.payload.apiClusterStatus);
    case AuthActionType.AUTH_REQUIRED: return clusterStatusDefault;
    default: return state;
  }
};

const dataFetchState: Reducer<FETCH_STATUS, (
    |ClusterAction.SyncClusterData
    |ClusterAction.FetchClusterDataSuccess
    |ClusterAction.FetchClusterDataFailed
    |AuthAction.AuthRequired
)> = (state = FETCH_STATUS.NOT_STARTED, action) => {
  switch (action.type) {
    case ClusterActionType.SYNC_CLUSTER_DATA: return FETCH_STATUS.IN_PROGRESS;
    case ClusterActionType.FETCH_CLUSTER_DATA_SUCCESS:
      return FETCH_STATUS.SUCCESS;
    case ClusterActionType.FETCH_CLUSTER_DATA_FAILED: return (
      state === FETCH_STATUS.IN_PROGRESS
        ? FETCH_STATUS.ERROR
        : state
    );
    case AuthActionType.AUTH_REQUIRED: return FETCH_STATUS.NOT_STARTED;
    default: return state;
  }
};

export default combineReducers<ClusterServiceState>({
  clusterState,
  dataFetchState,
});
