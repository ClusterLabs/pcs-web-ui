import { ApiClustersOverview } from "app/common/backend/types/clusterOverview";
import { apiToState } from "./apiToState";

import { DashboardState } from "./types";


const transformClustersOverview = (
  apiClusterOverview: ApiClustersOverview,
): DashboardState => ({
  clusterList: apiClusterOverview.cluster_list.map(apiToState),
});

export default transformClustersOverview;
