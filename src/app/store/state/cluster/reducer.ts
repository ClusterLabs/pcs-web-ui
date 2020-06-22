import { Reducer, combineReducers } from "redux";

import { Action } from "app/actions";

import { types } from "app/store";
import { apiToState as clusterApiToState } from "./apiToState";
import { clusterStatusDefault } from "./clusterStatusDefault";

const clusterState: Reducer<
  types.cluster.ClusterServiceState["clusterState"],
  Action
> = (state = clusterStatusDefault, action) => {
  switch (action.type) {
    case "CLUSTER_DATA.FETCH.SUCCESS":
      return clusterApiToState(action.payload.apiClusterStatus);
    default:
      return state;
  }
};

const dataFetchState: Reducer<
  types.cluster.ClusterServiceState["dataFetchState"],
  Action
> = (state = "NOT_STARTED", action) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC":
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";
    case "CLUSTER_DATA.FETCH.SUCCESS":
      return "SUCCESS";
    case "CLUSTER_DATA.FETCH.FAILED":
      return state === "IN_PROGRESS" ? "ERROR" : state;
    default:
      return state;
  }
};

const clusterStorageItem = combineReducers<types.cluster.ClusterServiceState>({
  clusterState,
  dataFetchState,
});

const clusterStorage: Reducer<types.cluster.ClusterStorage, Action> = (
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
