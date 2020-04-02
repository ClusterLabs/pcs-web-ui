import { ApiResponse, clustersOverview } from "app/backend";

export type DashboardActions = {
  FetchDashboardDataSuccess: {
    type: "DASHBOARD_DATA.FETCH.SUCCESS";
    payload: {
      apiClusterOverview: ApiResponse<typeof clustersOverview>;
    };
  };

  FetchDashboardDataFailed: { type: "DASHBOARD_DATA.FETCH.FAILED" };

  RefreshDashboardData: { type: "DASHBOARD_DATA.REFRESH" };

  SyncDashboardData: { type: "DASHBOARD_DATA.SYNC" };

  SyncDashboardDataStop: { type: "DASHBOARD_DATA.SYNC.STOP" };
};
