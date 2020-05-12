import { getLocationPathname } from "./router/selectors";
import { getUsername, loaded as usernameLoaded } from "./username/selectors";
import {
  areDataLoaded as clusterAreDataLoaded,
  crmStatusForNode,
  crmStatusForPrimitive,
  getCluster,
  getClusterMap,
  getSelectedNode,
  getSelectedResource,
} from "./cluster/selectors/cluster";
import { resourceGetConstraints } from "./cluster/selectors/constraints";
import {
  areDataLoaded as dashboardAreDataLoaded,
  getImportedClusterList,
} from "./dashboard/selectors";

import {
  getNodeName as addClusterGetNodeName,
  getStateError as addClusterGetStateError,
  getStepAddState as addClusterGetStepAddState,
  getStepAuthState as addClusterGetStepAuthState,
} from "./dashboard-add-cluster/selectors";

import {
  failMessage as loginGetFailMessage,
  isAcceptingLoginData as loginIsAcceptingData,
  failed as loginIsFailed,
  loginRequired as loginIsRequired,
} from "./login/selectors";

import { getOpenedItems as resourceTreeGetOpenedItems } from "./resourceTree/selectors";

import { getNotifications } from "./notifications/selectors";
import { getResourceAgent } from "./resourceAgents/selectors";

export {
  getLocationPathname,
  getUsername,
  usernameLoaded,
  clusterAreDataLoaded,
  crmStatusForNode,
  crmStatusForPrimitive,
  getCluster,
  getClusterMap,
  getSelectedResource,
  getSelectedNode,
  getImportedClusterList,
  dashboardAreDataLoaded,
  resourceGetConstraints,
  addClusterGetNodeName,
  addClusterGetStepAuthState,
  addClusterGetStateError,
  addClusterGetStepAddState,
  loginIsFailed,
  loginGetFailMessage,
  loginIsAcceptingData,
  loginIsRequired,
  getNotifications,
  getResourceAgent,
  resourceTreeGetOpenedItems,
};
