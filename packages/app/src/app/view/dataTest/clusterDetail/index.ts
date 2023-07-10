import {overview} from "./overview";
import {nodes} from "./nodes";
import {resources} from "./resources";
import {fenceDevices} from "./fenceDevices";

export const clusterDetail = {
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
  nodes,
  resources,
  fenceDevices,
  sbd: {
    toolbar: {
      configureSbd: {},
      disableSbd: {},
    },
    detail: {},
  },
  constraints: {
    toolbar: {
      createLocation: {},
      createOrder: {},
      createColocation: {},
      createTicket: {},
      createOrderSet: {},
      createColocationSet: {},
      createTicketSet: {},
    },
    detail: {},
  },
  properties: {
    toolbar: {},
    detail: {},
  },
  acl: {
    toolbar: {
      createRole: {},
      createUser: {},
      createGroup: {},
      switchEnablement: {
        confirm: {
          run: {},
          cancel: {},
        },
      },
    },
    detail: {},
  },
  permissions: {
    toolbar: {
      createPermission: {},
    },
    detail: {},
  },
};
