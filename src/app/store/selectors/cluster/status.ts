import {ClusterStorageItem, Root} from "../types";

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
