import { clustersOverview, ApiResponse } from "app/common/backend";

export interface FetchDashboardDataSuccess {
  type: "DASHBOARD_DATA.FETCH.SUCCESS",
  payload: {
    apiClusterOverview: ApiResponse<typeof clustersOverview>,
  },
}

export interface FetchDashboardDataFailed {
  type: "DASHBOARD_DATA.FETCH.FAILED",
}

export interface RefreshDashboardData {
  type: "DASHBOARD_DATA.REFRESH",
}

export interface SyncDashboardData {
  type: "DASHBOARD_DATA.SYNC",
}

export interface SyncDashboardDataStop {
  type: "DASHBOARD_DATA.SYNC.STOP",
}
