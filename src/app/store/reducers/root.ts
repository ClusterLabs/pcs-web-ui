import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import { dashboard } from "./dashboard";
import { addExistingCluster } from "./dashboardAddCluster";
import { nodeAuthMap } from "./nodeAuth";
import { notifications } from "./notifications";
import { login } from "./login";
import { username } from "./username";
import { clusterStorage } from "./cluster/storage";

export const root = (history: History) =>
  combineReducers({
    username,
    router: connectRouter(history),
    dashboard,
    addExistingCluster,
    clusterStorage,
    login,
    notifications,
    nodeAuthMap,
  });
