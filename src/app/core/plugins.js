import login from "app/scenes/login/plugin";
import dashboard from "app/scenes/dashboard/plugin";
import cluster from "app/services/cluster/plugin";
import addExistingCluster from "app/scenes/dashboard-add-cluster/plugin";
import notifications from "app/scenes/notifications/plugin";
import dataLoad from "app/services/data-load/plugin";

import router from "./routerPlugin";

export default history => ({
  router: router(history),
  dashboard,
  addExistingCluster,
  cluster,
  login,
  notifications,
  dataLoad,
});
