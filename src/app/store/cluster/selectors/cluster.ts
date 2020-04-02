import { Selector } from "../../types";
import { ClusterState, FETCH_STATUS, ResourceTreeItem } from "../types";

const fetchStatusSuccess: FETCH_STATUS = "SUCCESS";

export const areDataLoaded: Selector<boolean> = state =>
  state.cluster.dataFetchState === fetchStatusSuccess;

export const getCluster: Selector<ClusterState> = state =>
  state.cluster.clusterState;

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
  id: string,
): Selector<ResourceTreeItem | undefined> => (state) => {
  const cluster = getCluster(state);
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
