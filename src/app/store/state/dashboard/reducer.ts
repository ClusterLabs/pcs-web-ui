import { Reducer, combineReducers } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

const clusterNameListState: Reducer<
  types.dashboard.DashboardPageState["clusterNameListState"],
  Action
> = (state = [], action) => {
  switch (action.type) {
    case "DASHBOARD_DATA.FETCH.SUCCESS":
      return action.payload.clusterNameList;
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};

const dataFetchState: Reducer<
  types.dashboard.DashboardPageState["dataFetchState"],
  Action
> = (state = "NOT_STARTED", action) => {
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

export default combineReducers<types.dashboard.DashboardPageState>({
  clusterNameListState,
  dataFetchState,
});
