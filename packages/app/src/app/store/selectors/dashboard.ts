import {ClusterStorageItem, Root} from "./types";

export const getImportedClusterList = (state: Root) =>
  state.dashboard.clusterNameList;

export const dashboardGetLoadingStatus = (state: Root) => {
  return state.dashboard.dataFetch;
};

type ClusterInfoList = ({clusterName: string} & (
  | {
      isRegistered: false;
    }
  | {
      isRegistered: true;
      isFetched: false;
      isForbidden: boolean;
      clusterStatus: {
        load: {when: number; currently: boolean};
      };
    }
  | {
      isRegistered: true;
      isFetched: true;
      isForbidden: false;
      clusterStatus: {
        data: NonNullable<ClusterStorageItem["clusterStatus"]["clusterData"]>;
        load: {when: number; currently: boolean};
      };
    }
))[];

export const getClusterStoreInfoList =
  (clusterNameList: string[]) =>
  (state: Root): ClusterInfoList =>
    clusterNameList.map(clusterName => {
      if (!(clusterName in state.clusterStorage)) {
        // A very short init period before first cluster request action is run.
        return {clusterName, isRegistered: false};
      }

      const {
        clusterStatus: {
          load: {when, currently, result},
          clusterData: data,
        },
      } = state.clusterStorage[clusterName];

      if (result === "SUCCESS" && data !== null) {
        return {
          clusterName,
          isRegistered: true,
          isFetched: true,
          isForbidden: false,
          clusterStatus: {
            data,
            load: {when, currently},
          },
        };
      }

      return {
        clusterName,
        isRegistered: true,
        isFetched: false,
        isForbidden: result === "FORBIDDEN",
        clusterStatus: {
          load: {when, currently},
        },
      };
    });
