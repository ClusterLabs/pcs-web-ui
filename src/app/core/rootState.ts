import { RouterState } from "connected-react-router";

import { ClusterServiceState } from "app/services/cluster/types";
import { DashboardPageState } from "app/scenes/dashboard/types";
import {
  DashboardAddClusterPageState,
} from "app/scenes/dashboard-add-cluster/types";

export interface RootState {
  router: RouterState,
  cluster: ClusterServiceState,
  dashboard: DashboardPageState,
  addExistingCluster: DashboardAddClusterPageState,
}
