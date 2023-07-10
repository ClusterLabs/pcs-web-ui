import {setupCluster} from "./setupCluster";
import {notifications} from "./notifications";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubStructure extends Record<string, SubStructure> {}

// Avoid ambiguous paths. E.g. if there is `dashboard.toolbar.setupCluster` and
// also `setupCluster` then xpath `//*[@data-test="setupCluster"]` selects both.
//
// Tasks (wizards) are separated from "dashboard" or "clusterDetail" because
// theirs modality is done by element outside #root element of application.
//
// Don't use names:
// - mark
// - locator
// The structure is enhanced by this keys
export const structure = {
  clusterDetail: {
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
    overview: {
      toolbar: {
        startCluster: {},
        stopCluster: {},
      },
      detail: {},
    },
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
  },
  dashboard: {
    toolbar: {
      setupCluster: {},
      importExistingCluster: {},
    },
    clusterList: {
      cluster: {
        name: {},
        loaded: {
          issues: {},
          nodes: {},
          resources: {},
          fenceDevices: {},
          actions: {
            start: {
              confirm: {
                run: {},
                cancel: {},
              },
            },
            stop: {
              confirm: {
                run: {},
                cancel: {},
              },
            },
            remove: {
              confirm: {
                run: {},
                cancel: {},
              },
            },
            destroy: {
              confirm: {
                run: {},
                cancel: {},
              },
            },
          },
        },
      },
    },
  },
  notifications,
  setupCluster,
  importExistingCluster: {
    nodeName: {},
    nodeNameFooter: {
      checkAuthentication: {},
      back: {},
      cancel: {},
    },
    prepareNode: {
      auth: {
        customAddrSwitch: {},
        password: {},
        address: {},
        port: {},
      },
      success: {},
    },
    prepareNodeFooter: {
      addExistringCluster: {},
      back: {},
      cancel: {},
      authenticate: {},
    },
    success: {
      close: {},
    },
    error: {
      changeSettings: {},
      tryAgain: {},
      cancel: {},
    },
  },
};

type MarkTools = {
  mark: {"data-test": string};
};

type WithMarkTools<STRUCTURE extends SubStructure> = {
  [KEY in keyof STRUCTURE]: WithMarkTools<STRUCTURE[KEY]> & MarkTools;
};

const createMarkTools = <KEY extends string>(path: KEY[]): MarkTools => ({
  mark: {"data-test": path.join(".")},
});

const addMarkTools = <STRUCTURE extends SubStructure>(
  structure: STRUCTURE,
  path: string[] = [],
): WithMarkTools<STRUCTURE> =>
  Object.entries(structure).reduce<WithMarkTools<STRUCTURE>>(
    (structureWithLocators, [key, subStructure]) => ({
      ...structureWithLocators,
      [key]: addMarkTools(subStructure, [...path, key]),
    }),
    (path.length > 0 ? createMarkTools(path) : {}) as WithMarkTools<STRUCTURE>,
  );

export const testMarks = addMarkTools(structure);
