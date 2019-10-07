import { Selector, RootState } from "app/core/types";
import { ResourceTreeItem } from "app/services/cluster/types";
import { getCluster } from "app/services/cluster/selectors";

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


export const getSelectedResource = (id: string): Selector<
  RootState,
  ResourceTreeItem|undefined
> => (
  (state: RootState) => {
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
  }
);
