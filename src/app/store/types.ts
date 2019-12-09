import { RouterState } from "connected-react-router";

import { ClusterServiceState } from "./cluster/types";
import { DashboardAddClusterPageState } from "./dashboard-add-cluster/types";
import { DashboardPageState } from "./dashboard/types";
import { LoginState } from "./login/types";
import { NotificationState } from "./notifications/types";
import { ResourcePrimitiveState } from "./resourceAgents/types";
import { ResourceTreeState } from "./resourceTree/types";
import { UsernameState } from "./username/types";

export interface RootState {
  addExistingCluster: DashboardAddClusterPageState,
  cluster: ClusterServiceState,
  dashboard: DashboardPageState,
  login: LoginState,
  notifications: NotificationState,
  resourceAgents: ResourcePrimitiveState,
  resourceTree: ResourceTreeState,
  router: RouterState,
  username: UsernameState,
}

export interface Selector<Selected, State = RootState> {
  (state: State): Selected,
}
