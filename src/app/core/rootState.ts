import { RouterState } from "connected-react-router";

import { ClusterServiceState } from "app/services/cluster/types";
import { DashboardPageState } from "app/scenes/dashboard/types";
import {
  DashboardAddClusterPageState,
} from "app/scenes/dashboard-add-cluster/types";
import { LoginState } from "app/scenes/login/types";

export interface RootState {
  router: RouterState,
  dashboard: DashboardPageState,
  addExistingCluster: DashboardAddClusterPageState,
  cluster: ClusterServiceState,
  login: LoginState,
}
