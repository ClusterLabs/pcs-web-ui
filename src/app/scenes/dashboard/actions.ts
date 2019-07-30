import { ApiClustersOverview } from "app/backend/clusterOverviewTypes";
import { action } from "typesafe-actions";

import * as types from "./types";

export const fetchDashboardDataSuccess = (
  apiClusterOverview: ApiClustersOverview,
) => action(
  types.FETCH_DASHBOARD_DATA_SUCCESS,
  { apiClusterOverview },
);

export const fetchDashboardDataFailed = (errorMessage: string) => action(
  types.FETCH_DASHBOARD_DATA_FAILED,
  { errorMessage },
);

export const refreshDashboardData = () => action(types.REFRESH_DASHBOARD_DATA);

export const syncDashboardData = () => action(types.SYNC_DASHBOARD_DATA);

export const syncDashboardDataStop = () => action(
  types.SYNC_DASHBOARD_DATA_STOP,
);
