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
)> = (state = FETCH_STATUS.NOT_STARTED, action) => {
  switch (action.type) {
    case DashboardActionType.SYNC_DASHBOARD_DATA:
      return FETCH_STATUS.IN_PROGRESS;
    case DashboardActionType.FETCH_DASHBOARD_DATA_SUCCESS:
      return FETCH_STATUS.SUCCESS;
    case DashboardActionType.FETCH_DASHBOARD_DATA_FAILED: return (
      state === FETCH_STATUS.IN_PROGRESS
        ? FETCH_STATUS.ERROR
        : state
    );
    case AuthActionType.AUTH_REQUIRED: return FETCH_STATUS.NOT_STARTED;
    default: return state;
  }
};

export default combineReducers<DashboardPageState>({
  dashboardState,
  dataFetchState,
});

export const getDashboard = (state: DashboardPageState) => state.dashboardState;

export const areDataLoaded = (state: DashboardPageState) => (
  state.dataFetchState === FETCH_STATUS.SUCCESS
);
