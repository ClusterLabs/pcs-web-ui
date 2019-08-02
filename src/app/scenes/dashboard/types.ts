import { ClusterStatus } from "app/services/cluster/types";
import { ApiClustersOverview } from "app/backend/clusterOverviewTypes";
import { InitialFetchState } from "app/services/data-load/initialFetchTypes";

export const FETCH_DASHBOARD_DATA_SUCCESS = (
  "/dashboard/FETCH_DASHBOARD_DATA_SUCCESS"
);
export const FETCH_DASHBOARD_DATA_FAILED = (
  "/dashboard/FETCH_DASHBOARD_DATA_FAILED"
);
export const REFRESH_DASHBOARD_DATA = "/dashboard/REFRESH_DASHBOARD_DATA";
export const SYNC_DASHBOARD_DATA = "/dashboard/SYNC_DASHBOARD_DATA";
export const SYNC_DASHBOARD_DATA_STOP = "/dashboard/SYNC_DASHBOARD_DATA_STOP";

export interface FetchDashboardDataSuccessAction {
  type: typeof FETCH_DASHBOARD_DATA_SUCCESS,
  payload: {
    apiClusterOverview: ApiClustersOverview,
  },
}

export interface FetchDashboardDataFailedAction {
  type: typeof FETCH_DASHBOARD_DATA_FAILED,
  payload: {
    errorMessage: string,
  }
}

export interface RefreshDashboardDataAction {
  type: typeof REFRESH_DASHBOARD_DATA,
}

export interface DashboardState {
  clusterList: ClusterStatus[],
}

export interface DashboardPageState {
  dashboardState: DashboardState,
  dataFetchState: InitialFetchState,
}
