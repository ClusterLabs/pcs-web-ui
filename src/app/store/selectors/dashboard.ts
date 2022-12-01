import {ClusterStorageItem, Root} from "./types";

export const getImportedClusterList = (state: Root) =>
  state.dashboard.clusterNameList;

export const dashboardAreDataLoaded = (state: Root) =>
  state.dashboard.dataFetch === "SUCCESS";

type ClusterInfoList = ({clusterName: string} & (
  | {
      isFetched: false;
      isForbidden: boolean;
    }
  | {
      isFetched: true;
      isForbidden: false;
      clusterStatus: NonNullable<
        ClusterStorageItem["clusterStatus"]["clusterData"]
      >;
    }
))[];

export const getClusterStoreInfoList =
  (clusterNameList: string[]) =>
  (state: Root): ClusterInfoList =>
    clusterNameList.map(clusterName => {
      const clusterStorageItem = state.clusterStorage[clusterName];
      if (
        clusterStorageItem?.clusterStatus.dataFetchState === "SUCCESS"
        && clusterStorageItem?.clusterStatus.clusterData !== null
      ) {
        return {
          clusterName,
          isFetched: true,
          isForbidden: false,
          clusterStatus: clusterStorageItem.clusterStatus.clusterData,
        };
      }
      return {
        clusterName,
        isFetched: false,
        isForbidden:
          clusterStorageItem?.clusterStatus.dataFetchState === "FORBIDDEN",
      };
    });
