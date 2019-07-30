import { combineReducers, Reducer } from "redux";

import { createDataFetchReducer, createDataFetchSelector }
  from "app/services/data-load/initial-fetch-reducer";

import * as authTypes from "app/services/auth/constants";

import {
  DashboardState,
  State,
  FETCH_DASHBOARD_DATA_SUCCESS,
  FETCH_DASHBOARD_DATA_FAILED,
  SYNC_DASHBOARD_DATA,
} from "./types";

import overviewApiToState from "./overviewApiToState";

const dashboardStateDefault: DashboardState = {
  clusterList: [],
};

const dashboardState: Reducer<DashboardState> = (
  state = dashboardStateDefault,
  action,
) => {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA_SUCCESS:
      return overviewApiToState(action.payload.apiClusterOverview);
    case authTypes.AUTH_REQUIRED: return dashboardStateDefault;
    default: return state;
  }
};

export default combineReducers({
  dashboardState,
  dataFetchState: createDataFetchReducer({
    START: SYNC_DASHBOARD_DATA,
    SUCCESS: FETCH_DASHBOARD_DATA_SUCCESS,
    FAIL: FETCH_DASHBOARD_DATA_FAILED,
  }),
});

export const getDashboard = (state: State) => state.dashboardState;
export const getDashboardDataFetch = createDataFetchSelector(
  (state: State) => state.dataFetchState,
);
