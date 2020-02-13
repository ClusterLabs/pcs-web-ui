import { ApiClustersOverview } from "app/backend/types/clusterOverview";

import { apiToState } from "./apiToState/apiToState";
import { DashboardState } from "./types";


export const overviewApiToState = (
  apiClusterOverview: ApiClustersOverview,
): DashboardState => ({
  clusterList: apiClusterOverview.cluster_list.map(apiToState),
});
