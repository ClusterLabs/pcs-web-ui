import { combineReducers } from "redux";
import { RouterState, connectRouter } from "connected-react-router";
import { History } from "history";

import dashboard, { Dashboard } from "./dashboard";
import addExistingCluster, {
  DashboardAddClusterPageState,
} from "./dashboardAddCluster";
import nodeAuthMap, { NodeAuthMap } from "./nodeAuth";
import notifications, { NotificationState } from "./notifications";
import login, { LoginState } from "./login";
import username, { UsernameState } from "./username";
import clusterStorageReducer, * as clusterStorage from "./cluster/storage";

export interface RootState {
  addExistingCluster: DashboardAddClusterPageState;
  clusterStorage: clusterStorage.ClusterStorageMap;
  dashboard: Dashboard;
  login: LoginState;
  notifications: NotificationState;
  router: RouterState;
  username: UsernameState;
  nodeAuthMap: NodeAuthMap;
}

export default (history: History) =>
  combineReducers<RootState>({
    username,
    router: connectRouter(history),
    dashboard,
    addExistingCluster,
    clusterStorage: clusterStorageReducer,
    login,
    notifications,
    nodeAuthMap,
  });
