import { ClusterServiceState } from "app/services/cluster/types";
import { DashboardPageState } from "app/scenes/dashboard/types";
import {
  DashboardAddClusterPageState,
} from "app/scenes/dashboard-add-cluster/types";

export interface RootState {
  cluster: ClusterServiceState,
  dashboard: DashboardPageState,
  addExistingCluster: DashboardAddClusterPageState,
}
