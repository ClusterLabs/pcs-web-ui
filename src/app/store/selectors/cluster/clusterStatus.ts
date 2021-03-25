import * as types from "app/store/types";

import {
  clusterSelector,
  clusterStorageItemSelector,
} from "./selectorsHelpers";

const fetchStatusSuccess: types.cluster.ClusterStatusService["dataFetchState"] =
  "SUCCESS";

export const clusterAreDataLoaded = clusterStorageItemSelector(
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

export const getCluster = clusterSelector(clusterStatus => clusterStatus);

export const getSelectedResource = clusterSelector(
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

export const getSelectedFenceDevice = clusterSelector(
  (clusterStatus, id: string) =>
    clusterStatus.fenceDeviceList.find(fd => fd.id === id),
);

export const getSelectedNode = clusterSelector((clusterStatus, name: string) =>
  clusterStatus.nodeList.find(node => node.name === name),
);

export const crmStatusForPrimitive = clusterSelector(
  (clusterStatus, primitiveIds: string[]) =>
    clusterStatus.resourceOnNodeStatusList.filter(s =>
      primitiveIds.includes(s.resource.id),
    ),
);

export const crmStatusForNode = clusterSelector(
  (clusterStatus, nodeName: string) =>
    clusterStatus.resourceOnNodeStatusList.filter(
      s => s.node?.name === nodeName,
    ),
);
