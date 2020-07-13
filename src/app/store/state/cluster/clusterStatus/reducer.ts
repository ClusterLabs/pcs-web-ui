import { Reducer, combineReducers } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

import { apiToState as clusterApiToState } from "./apiToState";
import { clusterStatusDefault } from "./clusterStatusDefault";

const clusterData: Reducer<
  types.cluster.ClusterStatusService["clusterData"],
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
  types.cluster.ClusterStatusService["dataFetchState"],
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

export const clusterStatus = combineReducers<
  types.cluster.ClusterStatusService
>({
  clusterData,
  dataFetchState,
});
