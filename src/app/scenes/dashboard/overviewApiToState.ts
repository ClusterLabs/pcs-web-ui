import { ApiClustersOverview } from "app/common/backend/clusterOverviewTypes";
import {
  apiToState as clusterApiToState,
} from "app/services/cluster/apiToState";

import { DashboardState } from "./types";


const transformClustersOverview = (
  apiClusterOverview: ApiClustersOverview,
): DashboardState => ({
  clusterList: apiClusterOverview.cluster_list.map(clusterApiToState),
});

export default transformClustersOverview;
