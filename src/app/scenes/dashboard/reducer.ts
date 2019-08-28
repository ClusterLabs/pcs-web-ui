import { combineReducers, Reducer } from "redux";

import * as AuthAction from "app/services/auth/actions";

import {
  DashboardState,
  DashboardPageState,
  FETCH_STATUS,
} from "./types";
import * as DashboardAction from "./actions";
import overviewApiToState from "./overviewApiToState";

const dashboardStateDefault: DashboardState = {
  clusterList: [],
};

const dashboardState: Reducer<DashboardState, (
  |DashboardAction.FetchDashboardDataSuccess
  |AuthAction.AuthRequired
)> = (state = dashboardStateDefault, action) => {
  switch (action.type) {
    case "DASHBOARD_DATA.FETCH.SUCCESS":
      return overviewApiToState(action.payload.apiClusterOverview);
    case "AUTH.REQUIRED": return dashboardStateDefault;
    default: return state;
  }
};

const dataFetchState: Reducer<FETCH_STATUS, (
  |DashboardAction.SyncDashboardData
  |DashboardAction.FetchDashboardDataSuccess
  |DashboardAction.FetchDashboardDataFailed
  |AuthAction.AuthRequired
)> = (state = "NOT_STARTED", action) => {
  switch (action.type) {
    case "DASHBOARD_DATA.SYNC": return "IN_PROGRESS";
    case "DASHBOARD_DATA.FETCH.SUCCESS": return "SUCCESS";
    case "DASHBOARD_DATA.FETCH.FAILED":
      return state === "IN_PROGRESS" ? "ERROR" : state;
    case "AUTH.REQUIRED": return "NOT_STARTED";
    default: return state;
  }
};

export default combineReducers<DashboardPageState>({
  dashboardState,
  dataFetchState,
});
