import { RootState as TRootState } from "./reducer";
import { types as cluster } from "./cluster/clusterStatus";
import * as dashboard from "./dashboard";
import * as addCluster from "./dashboardAddCluster";
import * as notifications from "./notifications";
import * as nodeAuth from "./nodeAuth";
import * as pcmkAgents from "./cluster/pcmkAgents";
import * as clusterStorage from "./cluster/storage";
import * as login from "./login";
import * as username from "./username";
import * as clusterProperties from "./cluster/properties";
import * as resourceAgentMap from "./cluster/resourceAgentMap";
import * as wizardResourceCreate from "./cluster/wizardResourceCreate";

export type RootState = TRootState;
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
  wizardResourceCreate,
};
