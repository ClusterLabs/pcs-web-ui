import { ApiClustersOverview } from "app/backend/clusterOverviewTypes";

import * as types from "./types";

export const fetchDashboardData = () => ({
  type: types.FETCH_DASHBOARD_DATA,
});

export const fetchDashboardDataSuccess = (
  apiClusterOverview: ApiClustersOverview,
): types.ActionTypes => ({
  type: types.FETCH_DASHBOARD_DATA_SUCCESS,
  payload: { apiClusterOverview },
});

export const fetchDashboardDataFailed = (errorMessage: string) => ({
  type: types.FETCH_DASHBOARD_DATA_FAILED,
  payload: { errorMessage },
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
