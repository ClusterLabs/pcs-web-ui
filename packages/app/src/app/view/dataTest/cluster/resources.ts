const resource = {
  id: {},
  type: {},
  status: {},
};
export const resources = {
  tree: {
    primitive: resource,
    group: {
      ...resource,
      toggle: {},
    },
    clone: {
      ...resource,
      toggle: {},
    },
  },
  currentPrimitive: {
    id: {},
    toolbar: {
      manage: {},
      unmanage: {},
      enable: {},
      disable: {},
      dropdown: {
        changeGroup: {},
        refresh: {},
        cleanup: {},
        clone: {},
        unclone: {},
        delete: {},
      },
    },
    tabs: {
      detail: {},
      attributes: {},
      utilization: {},
      meta: {},
    },
  },
  currentGroup: {
    id: {},
    tabs: {
      detail: {},
      meta: {},
    },
  },
  currentClone: {
    id: {},
    tabs: {
      detail: {},
      meta: {},
    },
  },
  currentFenceDevice: {
    id: {},
  },
};
