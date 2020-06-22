import { types } from "app/store";
import { Selector } from "app/store/types";

import { clusterStatusDefault } from "../clusterStatusDefault";

const fetchStatusSuccess: types.cluster.ClusterServiceState["dataFetchState"] =
  "SUCCESS";

export const areDataLoaded = (
  clusterUrlName: string,
): Selector<boolean> => state =>
  state.clusterStorage[clusterUrlName]?.dataFetchState === fetchStatusSuccess;

export const getCluster = (
  clusterUrlName: string,
): Selector<types.cluster.ClusterServiceState["clusterState"]> => state =>
  state.clusterStorage[clusterUrlName]?.clusterState ?? clusterStatusDefault;

type ClusterInfo = {
  cluster: types.cluster.ClusterServiceState["clusterState"];
  isLoaded: boolean;
};
export function getClusterMap<T extends string>(
  clusterList: T[],
): Selector<Record<T, ClusterInfo>> {
  return state =>
    clusterList.reduce<Record<T, ClusterInfo>>(
      (map, name) => ({
        ...map,
        [name]: {
          cluster: areDataLoaded(name)(state)
            ? getCluster(name)(state)
            : { ...clusterStatusDefault, name, urlName: name },
          isLoaded: areDataLoaded(name)(state),
        },
      }),
      {} as Record<T, ClusterInfo>,
    );
}

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

export const getSelectedResource = (
  clusterUrlName: string,
  id: string,
): Selector<types.cluster.ResourceTreeItem | undefined> => (state) => {
  const cluster = getCluster(clusterUrlName)(state);
  for (const resource of cluster.resourceTree) {
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
};

export const getSelectedFenceDevice = (
  clusterUrlName: string,
  id: string,
): Selector<types.cluster.FenceDevice | undefined> => state =>
  getCluster(clusterUrlName)(state).fenceDeviceList.find(fd => fd.id === id);

export const getSelectedNode = (
  clusterUrlName: string,
  name: string,
): Selector<types.cluster.Node | undefined> => state =>
  getCluster(clusterUrlName)(state).nodeList.find(node => node.name === name);

export const crmStatusForPrimitive = (
  clusterUrlName: string,
  primitiveIds: string[],
): Selector<types.cluster.ResourceOnNodeStatus[]> => state =>
  getCluster(clusterUrlName)(state).resourceOnNodeStatusList.filter(s =>
    primitiveIds.includes(s.resource.id),
  );

export const crmStatusForNode = (
  clusterUrlName: string,
  nodeName: string,
): Selector<types.cluster.ResourceOnNodeStatus[]> => state =>
  getCluster(clusterUrlName)(state).resourceOnNodeStatusList.filter(
    s => s.node?.name === nodeName,
  );
