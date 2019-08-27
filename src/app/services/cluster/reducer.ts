import { combineReducers, Reducer } from "redux";

import { AuthActionType } from "app/services/auth/types";
import * as AuthAction from "app/services/auth/actions";

import { ClusterState, ClusterServiceState, FETCH_STATUS } from "./types";
import * as ClusterAction from "./actions";
import clusterApiToState from "./apiToState";

const clusterStatusDefault: ClusterState = {
  name: "",
  urlName: "",
  status: "UNKNOWN",
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
    case "CLUSTER_DATA.FETCH.SUCCESS":
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
)> = (state = "NOT_STARTED", action) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC": return "IN_PROGRESS";
    case "CLUSTER_DATA.FETCH.SUCCESS": return "SUCCESS";
    case "CLUSTER_DATA.FETCH.FAILED": return (
      state === "IN_PROGRESS"
        ? "ERROR"
        : state
    );
    case AuthActionType.AUTH_REQUIRED: return "NOT_STARTED";
    default: return state;
  }
};

export default combineReducers<ClusterServiceState>({
  clusterState,
  dataFetchState,
});
