import {overview} from "./overview";

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
  nodes: {
    toolbar: {
      addNode: {},
    },
    detail: {},
  },
  resources: {
    toolbar: {
      createResource: {},
      createGroup: {},
    },
    detail: {},
  },
  fenceDevices: {
    toolbar: {
      createFenceDevice: {},
    },
    detail: {},
  },
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
