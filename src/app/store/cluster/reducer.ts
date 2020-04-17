import { Reducer, combineReducers } from "redux";

import { Action } from "app/actions";

import {
  ClusterServiceState,
  ClusterState,
  ClusterStorage,
  FETCH_STATUS,
} from "./types";
import { apiToState as clusterApiToState } from "./apiToState";

const clusterStatusDefault: ClusterState = {
  name: "",
  urlName: "",
  status: "UNKNOWN",
  statusSeverity: "UNKNOWN",
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
    default:
      return state;
  }
};

const dataFetchState: Reducer<FETCH_STATUS, Action> = (
  state = "NOT_STARTED",
  action,
) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC":
      return "IN_PROGRESS";
    case "CLUSTER_DATA.FETCH.SUCCESS":
      return "SUCCESS";
    case "CLUSTER_DATA.FETCH.FAILED":
      return state === "IN_PROGRESS" ? "ERROR" : state;
    default:
      return state;
  }
};

const clusterStorageItem = combineReducers<ClusterServiceState>({
  clusterState,
  dataFetchState,
});

const clusterStorage: Reducer<ClusterStorage, Action> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC":
    case "CLUSTER_DATA.FETCH.SUCCESS":
    case "CLUSTER_DATA.FETCH.FAILED":
      return {
        ...state,
        [action.payload.clusterUrlName]: clusterStorageItem(
          state[action.payload.clusterUrlName],
          action,
        ),
      };
    case "AUTH.REQUIRED":
      return {};
    default:
      return state;
  }
};

export default clusterStorage;
