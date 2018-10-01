import * as types from "./constants";

export const fetchDashboardData = () => ({
  type: types.FETCH_DASHBOARD_DATA,
});

export const fetchDashboardDataSuccess = dashboardData => ({
  type: types.FETCH_DASHBOARD_DATA_SUCCESS,
  payload: dashboardData,
});

export const fetchDashboardDataFailed = error => ({
  type: types.FETCH_DASHBOARD_DATA_FAILED,
  payload: error,
});

export const refreshDashboardData = () => ({
  type: types.REFRESH_DASHBOARD_DATA,
});

export const syncDashboardData = () => ({
  type: types.SYNC_DASHBOARD_DATA,
});

export const syncDashboardDataStop = () => ({
  type: types.SYNC_DASHBOARD_DATA_STOP,
});
