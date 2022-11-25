import {Cluster, Group} from "app/view/cluster/types";

const findInTopLevelAndGroup = (
  resource:
    | Cluster["resourceTree"][number]
    | Cluster["fenceDeviceList"][number],
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
  resourceTree: Cluster["resourceTree"],
  id: string,
) => {
  for (const resource of resourceTree) {
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

export const selectGroups = (resourceTree: Cluster["resourceTree"]) =>
  resourceTree.reduce<Group[]>((groups, resource) => {
    if (resource.itemType === "group") {
      return [...groups, resource];
    }
    if (resource.itemType === "clone" && resource.member.itemType === "group") {
      return [...groups, resource.member];
    }
    return groups;
  }, []);
