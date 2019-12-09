import { getLocationPathname } from "./router/selectors";
import { getUsername, loaded as usernameLoaded } from "./username/selectors";
import {
  areDataLoaded as clusterAreDataLoaded,
  getCluster,
  getSelectedResource,
} from "./cluster/selectors/cluster";
import {
  resourceGetConstraints,
} from "./cluster/selectors/constraints";
import {
  getDashboard,
  areDataLoaded as dashboardAreDataLoaded,
} from "./dashboard/selectors";

import {
  getNodeName as addClusterGetNodeName,
  getStepAddState as addClusterGetStepAddState,
  getStepAuthState as addClusterGetStepAuthState,
  getStateError as addClusterGetStateError,
} from "./dashboard-add-cluster/selectors";

import {
  failed as loginIsFailed,
  failMessage as loginGetFailMessage,
  isAcceptingLoginData as loginIsAcceptingData,
  loginRequired as loginIsRequired,
} from "./login/selectors";

import {
  getOpenedItems as resourceTreeGetOpenedItems,
} from "./resourceTree/selectors";

import { getNotifications } from "./notifications/selectors";
import { getResourceAgent } from "./resourceAgents/selectors";

export {
  getLocationPathname,
  getUsername,
  usernameLoaded,
  clusterAreDataLoaded,
  getCluster,
  getSelectedResource,
  getDashboard,
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
