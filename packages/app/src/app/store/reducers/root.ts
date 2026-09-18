import {combineReducers} from "redux";

import {nodeAuthMap} from "./nodeAuth";
import {notifications} from "./notifications";
import {login} from "./login";
import {username} from "./username";
import {user} from "./user";
import {clusterStorage} from "./cluster/storage";
import {tasks} from "./tasks";
import {currentTaskKey} from "./currentTaskKey";

export const root = () =>
  combineReducers({
    username,
    user,
    clusterStorage,
    login,
    notifications,
    nodeAuthMap,
    tasks,
    currentTaskKey,
  });
