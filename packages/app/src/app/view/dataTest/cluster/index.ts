import {acl} from "./acl";
import {fenceDevices} from "./fenceDevices";
import {nodes} from "./nodes";
import {overview} from "./overview";
import {permissions} from "./permissions";
import {resources} from "./resources";
import {sbd} from "./sbd";

export const cluster = {
  breadcrumbs: {
    dashboard: {},
    clusterName: {},
  },
  tabs: {
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
  forbiden: {},
  loading: {},
  overview,
  overviewToolbar: {
    startCluster: {},
    stopCluster: {},
  },
  nodes,
  nodesToolbar: {
    addNode: {},
  },
  resources,
  resourcesToolbar: {
    createResource: {},
    createGroup: {},
  },
  fenceDevices,
  fenceDevicesToolbar: {
    createFenceDevice: {},
  },
  sbd,
  sbdToolbar: {
    configureSbd: {},
    disableSbd: {},
  },
  constraints: {},
  constraintsToolbar: {
    createLocation: {},
    createOrder: {},
    createColocation: {},
    dropdown: {
      createTicket: {},
      createOrderSet: {},
      createColocationSet: {},
      createTicketSet: {},
    },
  },
  properties: {},
  acl,
  aclToolbar: {
    createRole: {},
    createUser: {},
    dropdown: {
      createGroup: {},
      switchEnablement: {},
    },
  },
  permissions,
  permissionsToolbar: {
    createPermission: {},
  },
};
