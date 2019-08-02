import { ClusterServiceState } from "app/services/cluster/types";
import { DashboardPageState } from "app/scenes/dashboard/types";

export interface RootState {
  cluster: ClusterServiceState,
  dashboard: DashboardPageState,
}
