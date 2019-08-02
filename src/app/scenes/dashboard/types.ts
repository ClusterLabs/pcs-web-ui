import { ClusterState } from "app/services/cluster/types";
import { ApiClustersOverview } from "app/backend/clusterOverviewTypes";

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
}

export interface RefreshDashboardDataAction {
  type: typeof REFRESH_DASHBOARD_DATA,
}

export interface SyncDashboardDataAction {
  type: typeof SYNC_DASHBOARD_DATA,
}

export enum FETCH_STATUS {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface DashboardState {
  clusterList: ClusterState[],
}

export interface DashboardPageState {
  dashboardState: DashboardState,
  dataFetchState: FETCH_STATUS,
}
