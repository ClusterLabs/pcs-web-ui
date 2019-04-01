import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import login from "app/scenes/login/reducer";
import dashboard from "app/scenes/dashboard/reducer";
import cluster from "app/services/cluster/reducer";
import notifications from "app/scenes/notifications/reducer";
import addExistingCluster from "app/scenes/dashboard-add-cluster/reducer";

export default history => combineReducers({
  router: connectRouter(history),
  dashboard,
  addExistingCluster,
  login,
  cluster,
  notifications,
});
