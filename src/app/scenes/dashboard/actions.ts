import { ApiClustersOverview } from "app/backend/clusterOverviewTypes";
import { action } from "typesafe-actions";

import {
  FETCH_DASHBOARD_DATA_SUCCESS,
  FETCH_DASHBOARD_DATA_FAILED,
  REFRESH_DASHBOARD_DATA,
  SYNC_DASHBOARD_DATA,
  SYNC_DASHBOARD_DATA_STOP,
} from "./types";

export const fetchDashboardDataSuccess = (
  apiClusterOverview: ApiClustersOverview,
) => action(FETCH_DASHBOARD_DATA_SUCCESS, { apiClusterOverview });

export const fetchDashboardDataFailed = (
  errorMessage: string,
) => action(FETCH_DASHBOARD_DATA_FAILED, { errorMessage });

export const refreshDashboardData = () => action(REFRESH_DASHBOARD_DATA);

export const syncDashboardData = () => action(SYNC_DASHBOARD_DATA);

export const syncDashboardDataStop = () => action(SYNC_DASHBOARD_DATA_STOP);
