import { RouterState } from "connected-react-router";

import { ClusterServiceState } from "app/services/cluster/types";
import { UsernameState } from "app/services/username/types";
import { DashboardPageState } from "app/scenes/dashboard/types";
import { LoginState } from "app/scenes/login/types";
import { NotificationState } from "app/scenes/notifications/types";
import { ResourceTreeState } from "app/scenes/resource-tree/types";
import {
  ResourcePrimitiveState,
} from "app/scenes/resource-primitive/types";
import {
  DashboardAddClusterPageState,
} from "app/scenes/dashboard-add-cluster/types";

export interface RootState {
  username: UsernameState,
  router: RouterState,
  dashboard: DashboardPageState,
  addExistingCluster: DashboardAddClusterPageState,
  cluster: ClusterServiceState,
  resourceTree: ResourceTreeState,
  resourcePrimitive: ResourcePrimitiveState,
  login: LoginState,
  notifications: NotificationState,
}

export interface Selector<State = any, Selected = any> {
  (state: State): Selected,
}
