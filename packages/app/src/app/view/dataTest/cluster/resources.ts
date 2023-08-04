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
      manage: {
        confirm: {
          run: {},
          cancel: {},
        },
      },
      unmanage: {
        confirm: {
          run: {},
          cancel: {},
        },
      },
      enable: {
        confirm: {
          run: {},
          cancel: {},
        },
      },
      disable: {
        confirm: {
          run: {},
          cancel: {},
        },
      },
      dropdown: {
        changeGroup: {},
        refresh: {
          confirm: {
            run: {},
            cancel: {},
          },
        },
        cleanup: {
          confirm: {
            run: {},
            cancel: {},
          },
        },
        clone: {
          confirm: {
            run: {},
            cancel: {},
          },
        },
        unclone: {
          confirm: {
            run: {},
            cancel: {},
          },
        },
        delete: {
          confirm: {
            run: {},
            cancel: {},
          },
        },
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
