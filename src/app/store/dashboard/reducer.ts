import { Reducer, combineReducers } from "redux";

import { Action } from "app/actions";

import {
  ClusterNameListState,
  DashboardPageState,
  FETCH_STATUS,
} from "./types";

const clusterNameListState: Reducer<ClusterNameListState, Action> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case "DASHBOARD_DATA.FETCH.SUCCESS":
      return action.payload.clusterNameList;
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};

const dataFetchState: Reducer<FETCH_STATUS, Action> = (
  state = "NOT_STARTED",
  action,
) => {
  switch (action.type) {
    case "DASHBOARD_DATA.SYNC":
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";
    case "DASHBOARD_DATA.FETCH.SUCCESS":
      return "SUCCESS";
    case "DASHBOARD_DATA.FETCH.FAILED":
      return state === "IN_PROGRESS" ? "ERROR" : state;
    case "AUTH.REQUIRED":
      return "NOT_STARTED";
    default:
      return state;
  }
};

export default combineReducers<DashboardPageState>({
  clusterNameListState,
  dataFetchState,
});
