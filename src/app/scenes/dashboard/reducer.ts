import { combineReducers, Reducer } from "redux";

import { AuthRequired, AUTH_REQUIRED } from "app/services/auth/constants";

import {
  DashboardState,
  DashboardPageState,
  FetchDashboardDataSuccessAction,
  FetchDashboardDataFailedAction,
  SyncDashboardDataAction,
  FETCH_DASHBOARD_DATA_SUCCESS,
  FETCH_DASHBOARD_DATA_FAILED,
  SYNC_DASHBOARD_DATA,
  FETCH_STATUS,
} from "./types";
import overviewApiToState from "./overviewApiToState";

const dashboardStateDefault: DashboardState = {
  clusterList: [],
};

const dashboardState: Reducer<DashboardState> = (
  state = dashboardStateDefault,
  action: FetchDashboardDataSuccessAction|AuthRequired,
) => {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA_SUCCESS:
      return overviewApiToState(action.payload.apiClusterOverview);
    case AUTH_REQUIRED: return dashboardStateDefault;
    default: return state;
  }
};

const dataFetchState: Reducer<FETCH_STATUS> = (
  state = FETCH_STATUS.NOT_STARTED,
  action: (
    |SyncDashboardDataAction
    |FetchDashboardDataSuccessAction
    |FetchDashboardDataFailedAction
    |AuthRequired
  ),
) => {
  switch (action.type) {
    case SYNC_DASHBOARD_DATA: return FETCH_STATUS.IN_PROGRESS;
    case FETCH_DASHBOARD_DATA_SUCCESS: return FETCH_STATUS.SUCCESS;
    case FETCH_DASHBOARD_DATA_FAILED: return (
      state === FETCH_STATUS.IN_PROGRESS
        ? FETCH_STATUS.ERROR
        : state
    );
    case AUTH_REQUIRED: return FETCH_STATUS.NOT_STARTED;
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
