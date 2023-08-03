import {overview} from "./overview";
import {nodes} from "./nodes";
import {resources} from "./resources";
import {fenceDevices} from "./fenceDevices";
import {acl} from "./acl";

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
  sbd: {},
  sbdToolbar: {
    configureSbd: {},
    disableSbd: {},
  },
  constraints: {},
  constraintsToolbar: {
    createLocation: {},
    createOrder: {},
    createColocation: {},
    createTicket: {},
    createOrderSet: {},
    createColocationSet: {},
    createTicketSet: {},
    dropdown: {},
  },
  properties: {},
  acl,
  aclToolbar: {
    createRole: {},
    createUser: {},
    createGroup: {},
    switchEnablement: {
      confirm: {
        run: {},
        cancel: {},
      },
    },
    dropdown: {},
  },
  permissions: {},
  permissionsToolbar: {
    createPermission: {},
  },
};
