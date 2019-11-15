import { combineReducers, Reducer } from "redux";

import { Action } from "app/common/actions";

import { ClusterState, ClusterServiceState, FETCH_STATUS } from "./types";
import { apiToState as clusterApiToState } from "./apiToState";

const clusterStatusDefault: ClusterState = {
  name: "",
  urlName: "",
  status: "UNKNOWN",
  nodeList: [],
  resourceTree: [],
  fenceDeviceList: [],
  issueList: [],
  summary: {
    nodesSeverity: "UNKNOWN",
    resourcesSeverity: "UNKNOWN",
    fenceDevicesSeverity: "UNKNOWN",
    issuesSeverity: "UNKNOWN",
  },
};

const clusterState: Reducer<ClusterState, Action> = (
  state = clusterStatusDefault,
  action,
) => {
  switch (action.type) {
    case "CLUSTER_DATA.FETCH.SUCCESS":
      return clusterApiToState(action.payload.apiClusterStatus);
    case "AUTH.REQUIRED": return clusterStatusDefault;
    default: return state;
  }
};

const dataFetchState: Reducer<FETCH_STATUS, Action> = (
  state = "NOT_STARTED",
  action,
) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC": return "IN_PROGRESS";
    case "CLUSTER_DATA.FETCH.SUCCESS": return "SUCCESS";
    case "CLUSTER_DATA.FETCH.FAILED": return (
      state === "IN_PROGRESS"
        ? "ERROR"
        : state
    );
    case "AUTH.REQUIRED": return "NOT_STARTED";
    default: return state;
  }
};

export default combineReducers<ClusterServiceState>({
  clusterState,
  dataFetchState,
});
