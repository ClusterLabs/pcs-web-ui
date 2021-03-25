import { types as cluster } from "./reducers/cluster/clusterStatus";
import * as dashboard from "./reducers/dashboard";
import * as addCluster from "./reducers/dashboardAddCluster";
import * as notifications from "./reducers/notifications";
import * as nodeAuth from "./reducers/nodeAuth";
import * as pcmkAgents from "./reducers/cluster/pcmkAgents";
import * as clusterStorage from "./reducers/cluster/storage";
import * as login from "./reducers/login";
import * as username from "./reducers/username";
import * as clusterProperties from "./reducers/cluster/properties";
import * as resourceAgentMap from "./reducers/cluster/resourceAgentMap";

export {
  addCluster,
  cluster,
  clusterProperties,
  dashboard,
  login,
  username,
  notifications,
  nodeAuth,
  pcmkAgents,
  resourceAgentMap,
  clusterStorage,
};
