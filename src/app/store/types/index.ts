import { RouterState } from "connected-react-router";

import * as cluster from "./cluster";
import * as dashboard from "./dashboard";
import * as addCluster from "./dashboard-add-cluster";
import * as notifications from "./notifications";
import * as resourceTree from "./resourceTree";
import * as pcmkAgents from "./pcmkAgents";
import * as login from "./login";
import * as username from "./username";
import * as clusterStorage from "./clusterStorage";
import * as clusterProperties from "./clusterProperties";

export interface RootState {
  addExistingCluster: addCluster.DashboardAddClusterPageState;
  clusterStorage: clusterStorage.Map;
  dashboard: dashboard.DashboardPageState;
  login: login.LoginState;
  notifications: notifications.NotificationState;
  router: RouterState;
  username: username.UsernameState;
}

export interface Selector<Selected, State = RootState> {
  (state: State): Selected;
}

export {
  addCluster,
  cluster,
  clusterProperties,
  clusterStorage,
  dashboard,
  login,
  username,
  notifications,
  resourceTree,
  pcmkAgents,
};
