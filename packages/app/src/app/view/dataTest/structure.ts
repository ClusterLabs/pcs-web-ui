import {notifications} from "./notifications";
import {dashboard} from "./dashboard";
import {cluster} from "./cluster";
import {task} from "./task";

// Tasks (wizards) are separated from "dashboard" or "clusterDetail" because
// theirs modality is done by element outside #root element of application.
//
// Don't use names:
// - mark
// - locator
// - path
// The structure is enhanced by this keys (here or in tests)
export const structure = {
  header: {
    userMenu: {
      logout: {},
    },
  },
  notifications,
  login: {
    form: {},
  },
  dashboardToolbar: {
    setupCluster: {},
    importExistingCluster: {},
  },
  dashboard,
  clusterBreadcrumbs: {
    dashboard: {},
    clusterName: {},
    clusterStatus: {},
  },
  clusterTabs: {
    overview: {},
    nodes: {},
    resources: {},
    fenceDevices: {},
    sbd: {},
    constraints: {},
    properties: {},
    acl: {},
    permissions: {},
  },
  cluster,
  task,
};
