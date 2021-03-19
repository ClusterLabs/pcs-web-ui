import * as types from "app/store/types";

import { clusterSelector, clusterStatusSelector } from "./selectorsHelpers";

const fetchStatusSuccess: types.cluster.ClusterStatusService["dataFetchState"] =
  "SUCCESS";

export const clusterAreDataLoaded = clusterSelector(
  clusterStorageItem =>
    clusterStorageItem?.clusterStatus?.dataFetchState === fetchStatusSuccess,
);

const findInTopLevelAndGroup = (
  resource: types.cluster.ResourceTreeItem,
  id: string,
) => {
  if (resource.id === id) {
    return resource;
  }

  if (resource.itemType === "group") {
    const primitive = resource.resources.find(p => p.id === id);
    if (primitive) {
      return primitive;
    }
  }

  return undefined;
};

export const getCluster = clusterStatusSelector(clusterStatus => clusterStatus);

export const getSelectedResource = clusterStatusSelector(
  (clusterStatus, id: string) => {
    for (const resource of clusterStatus.resourceTree) {
      const matched = findInTopLevelAndGroup(resource, id);
      if (matched) {
        return matched;
      }

      if (resource.itemType === "clone") {
        const member = findInTopLevelAndGroup(resource.member, id);
        if (member) {
          return member;
        }
      }
    }

    return undefined;
  },
);

export const getSelectedFenceDevice = clusterStatusSelector(
  (clusterStatus, id: string) =>
    clusterStatus.fenceDeviceList.find(fd => fd.id === id),
);

export const getSelectedNode = clusterStatusSelector(
  (clusterStatus, name: string) =>
    clusterStatus.nodeList.find(node => node.name === name),
);

export const crmStatusForPrimitive = clusterStatusSelector(
  (clusterStatus, primitiveIds: string[]) =>
    clusterStatus.resourceOnNodeStatusList.filter(s =>
      primitiveIds.includes(s.resource.id),
    ),
);

export const crmStatusForNode = clusterStatusSelector(
  (clusterStatus, nodeName: string) =>
    clusterStatus.resourceOnNodeStatusList.filter(
      s => s.node?.name === nodeName,
    ),
);
