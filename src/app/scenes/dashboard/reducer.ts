import { combineReducers, Reducer } from "redux";

import { AuthActionType } from "app/services/auth/types";
import * as AuthAction from "app/services/auth/actions";

import {
  DashboardState,
  DashboardPageState,
  DashboardActionType,
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
    case DashboardActionType.FETCH_DASHBOARD_DATA_SUCCESS:
      return overviewApiToState(action.payload.apiClusterOverview);
    case AuthActionType.AUTH_REQUIRED: return dashboardStateDefault;
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
    case DashboardActionType.SYNC_DASHBOARD_DATA: return "IN_PROGRESS";
    case DashboardActionType.FETCH_DASHBOARD_DATA_SUCCESS: return "SUCCESS";
    case DashboardActionType.FETCH_DASHBOARD_DATA_FAILED:
      return state === "IN_PROGRESS" ? "ERROR" : state;
    case AuthActionType.AUTH_REQUIRED: return "NOT_STARTED";
    default: return state;
  }
};

export default combineReducers<DashboardPageState>({
  dashboardState,
  dataFetchState,
});
