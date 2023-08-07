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
  },
  currentGroup: {
    id: {},
  },
  currentClone: {
    id: {},
  },
  currentFenceDevice: {
    id: {},
  },
};
