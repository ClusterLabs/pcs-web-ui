import { ApiClustersOverview } from "app/backend/clusterOverviewTypes";
import clusterApiToState from "app/services/cluster/apiToState";

import { DashboardState } from "./types";


const transformClustersOverview = (
  apiClusterOverview: ApiClustersOverview,
): DashboardState => ({
  clusterList: apiClusterOverview.cluster_list.map(clusterApiToState),
});

export default transformClustersOverview;
