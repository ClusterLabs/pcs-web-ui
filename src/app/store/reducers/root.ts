import { combineReducers } from "redux";

import { dashboard } from "./dashboard";
import { nodeAuthMap } from "./nodeAuth";
import { notifications } from "./notifications";
import { login } from "./login";
import { username } from "./username";
import { clusterStorage } from "./cluster/storage";
import { tasks } from "./tasks";

export const root = () =>
  combineReducers({
    username,
    dashboard,
    clusterStorage,
    login,
    notifications,
    nodeAuthMap,
    tasks,
  });
