import {nvpairs} from "./nvpairs";

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
    detail: {},
    attributes: {},
    utilization: nvpairs,
    meta: nvpairs,
  },
  currentGroup: {
    id: {},
    tabs: {
      detail: {},
      meta: {},
    },
    detail: {},
    meta: nvpairs,
  },
  currentClone: {
    id: {},
    tabs: {
      detail: {},
      meta: {},
    },
    detail: {},
    meta: nvpairs,
  },
  currentFenceDevice: {
    id: {},
  },
};
