import { combineReducers } from "redux";

import { createDataFetchReducer, createDataFetchSelector }
  from "app/services/data-load/initial-fetch-reducer";

import * as types from "./constants";

const dashboardDataDefaultState = {
  clusterList: [],
};

const dashboardData = (state = dashboardDataDefaultState, action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_DATA_SUCCESS: return action.payload;
    default: return state;
  }
};

export default combineReducers({
  dashboardData,
  dataFetch: createDataFetchReducer({
    START: types.SYNC_DASHBOARD_DATA,
    SUCCESS: types.FETCH_DASHBOARD_DATA_SUCCESS,
    FAIL: types.FETCH_DASHBOARD_DATA_FAILED,
  }),
});

export const getDashboard = state => state.dashboardData;
export const getDashboardDataFetch = createDataFetchSelector(
  state => state.dataFetch,
);
