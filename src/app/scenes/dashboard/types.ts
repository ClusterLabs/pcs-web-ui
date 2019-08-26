import { ClusterState } from "app/services/cluster/types";

export enum DashboardActionType {
  FETCH_DASHBOARD_DATA_SUCCESS = "/dashboard/FETCH_DASHBOARD_DATA_SUCCESS",
  FETCH_DASHBOARD_DATA_FAILED = "/dashboard/FETCH_DASHBOARD_DATA_FAILED",
  REFRESH_DASHBOARD_DATA = "/dashboard/REFRESH_DASHBOARD_DATA",
  SYNC_DASHBOARD_DATA = "/dashboard/SYNC_DASHBOARD_DATA",
  SYNC_DASHBOARD_DATA_STOP = "/dashboard/SYNC_DASHBOARD_DATA_STOP",
}

export type FETCH_STATUS = "NOT_STARTED"|"IN_PROGRESS"|"SUCCESS"|"ERROR"

export interface DashboardState {
  clusterList: ClusterState[],
}

export interface DashboardPageState {
  dashboardState: DashboardState,
  dataFetchState: FETCH_STATUS,
}