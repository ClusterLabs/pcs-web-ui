import {nvpairs} from "./nvpairs";

export const nodes = {
  list: {
    node: {
      name: {},
      status: {},
      quorum: {},
    },
  },
  currentNode: {
    name: {},
    toolbar: {
      start: {},
      stop: {},
      dropdown: {
        standby: {},
        unstandby: {},
        maintenance: {},
        unmaintenance: {},
        remove: {},
      },
    },
    tabs: {
      detail: {},
      attributes: {},
      utilization: {},
    },
    detail: {},
    attributes: nvpairs,
    utilization: nvpairs,
  },
};
