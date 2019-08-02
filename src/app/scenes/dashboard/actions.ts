import { ApiClustersOverview } from "app/backend/clusterOverviewTypes";

import { DashboardActionType } from "./types";

export interface FetchDashboardDataSuccess {
  type: typeof DashboardActionType.FETCH_DASHBOARD_DATA_SUCCESS,
  payload: {
    apiClusterOverview: ApiClustersOverview,
  },
}

export interface FetchDashboardDataFailed {
  type: typeof DashboardActionType.FETCH_DASHBOARD_DATA_FAILED,
}

export interface RefreshDashboardData {
  type: typeof DashboardActionType.REFRESH_DASHBOARD_DATA,
}

export interface SyncDashboardData {
  type: typeof DashboardActionType.SYNC_DASHBOARD_DATA,
}
