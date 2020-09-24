export type DashboardActions = {
  FetchDashboardDataSuccess: {
    type: "DASHBOARD_DATA.FETCH.SUCCESS";
    payload: {
      clusterNameList: string[];
    };
  };

  RefreshDashboardData: { type: "DASHBOARD_DATA.REFRESH" };

  SyncDashboardData: { type: "DASHBOARD_DATA.SYNC" };

  SyncDashboardDataStop: { type: "DASHBOARD_DATA.SYNC.STOP" };
};
