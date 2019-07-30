import { ClusterStatus } from "app/services/cluster/types";
import * as initialFetchTypes from "app/services/data-load/initialFetchTypes";

export const FETCH_DASHBOARD_DATA = "/dashboard/FETCH_DASHBOARD_DATA";
export const FETCH_DASHBOARD_DATA_SUCCESS = "/dashboard/FETCH_DASHBOARD_DATA_SUCCESS"
;
export const FETCH_DASHBOARD_DATA_FAILED = "/dashboard/FETCH_DASHBOARD_DATA_FAILED"
;
export const REFRESH_DASHBOARD_DATA = "/dashboard/REFRESH_DASHBOARD_DATA";
export const SYNC_DASHBOARD_DATA = "/dashboard/SYNC_DASHBOARD_DATA";
export const SYNC_DASHBOARD_DATA_STOP = "/dashboard/SYNC_DASHBOARD_DATA_STOP";

export interface DashboardState {
  clusterList: ClusterStatus[],
}

export interface State {
  dashboardState: DashboardState,
  dataFetchState: initialFetchTypes.State,
}
