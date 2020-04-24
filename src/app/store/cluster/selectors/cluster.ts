import { Selector } from "../../types";
import { clusterStatusDefault } from "../clusterStatusDefault";
import { ClusterServiceState, Node, ResourceTreeItem } from "../types";

const fetchStatusSuccess: ClusterServiceState["dataFetchState"] = "SUCCESS";

export const areDataLoaded = (
  clusterUrlName: string,
): Selector<boolean> => state =>
  state.clusterStorage[clusterUrlName]?.dataFetchState === fetchStatusSuccess;

export const getCluster = (
  clusterUrlName: string,
): Selector<ClusterServiceState["clusterState"]> => state =>
  state.clusterStorage[clusterUrlName]?.clusterState ?? clusterStatusDefault;

type ClusterInfo = {
  cluster: ClusterServiceState["clusterState"];
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

const findInTopLevelAndGroup = (resource: ResourceTreeItem, id: string) => {
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
): Selector<ResourceTreeItem | undefined> => (state) => {
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

export const getSelectedNode = (
  clusterUrlName: string,
  name: string,
): Selector<Node | undefined> => state =>
  getCluster(clusterUrlName)(state).nodeList.find(node => node.name === name);
