import {Cluster, ClusterStorageItem, Root} from "../types";

import {clusterSelector} from "./selectorsHelpers";

type Resource = Cluster["resourceTree"][number];
type Group = Extract<Resource, {itemType: "group"}>;
type Primitive = Extract<Group["resources"][number], {itemType: "primitive"}>;

const findInTopLevelAndGroup = (
  resource: Resource | Cluster["fenceDeviceList"][number],
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

type ClusterInfo = {clusterName: string} & (
  | {
      state:
        | "cluster-not-in-storage"
        | "cluster-data-forbidden"
        | "cluster-data-not-fetched";
    }
  | {
      state: "cluster-data-successfully-fetched";
      cluster: ClusterStorageItem["clusterStatus"]["clusterData"];
    }
);

export const getClusterInfo =
  (clusterName: string) =>
  (state: Root): ClusterInfo => {
    const clusterStorageItem = state.clusterStorage[clusterName];
    if (clusterStorageItem === undefined) {
      return {
        clusterName,
        state: "cluster-not-in-storage",
      };
    }
    if (clusterStorageItem?.clusterStatus?.dataFetchState === "SUCCESS") {
      return {
        clusterName,
        state: "cluster-data-successfully-fetched",
        cluster: clusterStorageItem.clusterStatus.clusterData,
      };
    }
    if (clusterStorageItem?.clusterStatus?.dataFetchState === "FORBIDDEN") {
      return {
        clusterName,
        state: "cluster-data-forbidden",
      };
    }
    return {
      clusterName,
      state: "cluster-data-not-fetched",
    };
  };

export const getCluster = clusterSelector(cluster => cluster);

export const getSelectedResource = clusterSelector((cluster, id: string) => {
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
});

export const getGroups = clusterSelector(cluster =>
  cluster.resourceTree.reduce<Group[]>((groups, resource) => {
    if (resource.itemType === "group") {
      return [...groups, resource];
    }
    if (resource.itemType === "clone" && resource.member.itemType === "group") {
      return [...groups, resource.member];
    }
    return groups;
  }, []),
);

const removeFenceDevices = (groupMembers: Group["resources"]): Primitive[] =>
  groupMembers.filter((gm): gm is Primitive => gm.itemType !== "fence-device");

export const getResourcesForSet = clusterSelector(cluster =>
  cluster.resourceTree
    .reduce<Resource[]>((resourceList, resource) => {
      switch (resource.itemType) {
        case "group":
          return [
            ...resourceList,
            resource,
            ...removeFenceDevices(resource.resources),
          ];

        case "clone": {
          let members: Resource[] = [];
          if (resource.member.itemType === "group") {
            members = [
              resource.member,
              ...removeFenceDevices(resource.member.resources),
            ];
          } else if (resource.member.itemType !== "fence-device") {
            members = [resource.member];
          }

          return [...resourceList, resource, ...members];
        }

        default:
          return [...resourceList, resource];
      }
    }, [])
    .map(resource => resource.id),
);

export const getTopLevelPrimitives = clusterSelector(cluster =>
  cluster.resourceTree.filter(r => r.itemType === "primitive").map(r => r.id),
);

export const getSelectedFenceDevice = clusterSelector((cluster, id: string) =>
  cluster.fenceDeviceList.find(fd => fd.id === id),
);

export const getSelectedNode = clusterSelector((cluster, name: string) =>
  cluster.nodeList.find(node => node.name === name),
);

export const crmStatusForPrimitive = clusterSelector(
  (cluster, primitiveIds: string[]) =>
    cluster.resourceOnNodeStatusList.filter(s =>
      primitiveIds.includes(s.resource.id),
    ),
);

export const crmStatusForNode = clusterSelector((cluster, nodeName: string) =>
  cluster.resourceOnNodeStatusList.filter(s => s.node?.name === nodeName),
);
