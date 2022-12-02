import {ClusterStorageItem, ClusterTaskKeys, Root} from "../types";

import {
  ClusterSelector as TClusterSelector,
  clusterStorageItemSelector,
} from "./selectorsHelpers";

export const getClusterTask = <NAME extends ClusterTaskKeys>(name: NAME) =>
  clusterStorageItemSelector(
    clusterStorageItem => clusterStorageItem.tasks[name],
  );

export const getPcmkAgent = clusterStorageItemSelector(
  (clusterStorageItem, agentName: string) =>
    clusterStorageItem.pcmkAgents[agentName],
);

export const resourceTreeGetOpenedItems = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.resourceTree || [],
);

export const getClusterProperties = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.clusterProperties.data,
);

export const getResourceAgentMap = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.resourceAgentMap.data,
);

export const getFenceAgentList = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.fenceAgentList,
);

export type ClusterSelector<
  ARGS extends unknown[],
  SELECTED,
> = TClusterSelector<ARGS, SELECTED>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExtractClusterSelector<SELECTOR> = SELECTOR extends ClusterSelector<
  any[],
  infer SELECTED
>
  ? SELECTED
  : never;

type ClusterInfoClusterStatus =
  | {
      isLoaded: false;
      isForbidden: boolean;
    }
  | {
      isLoaded: true;
      isForbidden: false;
      data: NonNullable<ClusterStorageItem["clusterStatus"]["clusterData"]>;
    };

type ClusterInfoPermissions =
  | {isLoaded: false}
  | {
      isLoaded: true;
      data: NonNullable<ClusterStorageItem["clusterPermissions"]["data"]>;
    };

type ClusterInfo =
  | {isRegistered: false}
  | {
      isRegistered: true;
      clusterStatus: ClusterInfoClusterStatus;
      permissions: ClusterInfoPermissions;
    };

export const getClusterStoreInfo =
  (clusterName: string) =>
  (state: Root): ClusterInfo => {
    const clusterStoreItem = state.clusterStorage[clusterName];
    if (clusterStoreItem === undefined) {
      return {
        isRegistered: false,
      };
    }
    let clusterStatus: ClusterInfoClusterStatus = {
      isLoaded: false,
      isForbidden:
        clusterStoreItem?.clusterStatus.dataFetchState === "FORBIDDEN",
    };

    if (
      clusterStoreItem?.clusterStatus.dataFetchState === "SUCCESS"
      && clusterStoreItem.clusterStatus.clusterData !== null
    ) {
      clusterStatus = {
        isLoaded: true,
        isForbidden: false,
        data: clusterStoreItem.clusterStatus.clusterData,
      };
    }

    let permissions: ClusterInfoPermissions = {isLoaded: false};

    if (clusterStoreItem.clusterPermissions.data !== null) {
      permissions = {
        isLoaded: true,
        data: clusterStoreItem.clusterPermissions.data,
      };
    }

    return {
      isRegistered: true,
      clusterStatus,
      permissions,
    };
  };
