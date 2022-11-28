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

export const getClusterPermissions = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem?.clusterPermissions,
);

export const getResourceAgentMap = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.resourceAgentMap.data,
);

export const getFenceAgentList = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.fenceAgentList.data,
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

type ClusterInfo = {clusterStoreItem: ClusterStorageItem} & (
  | {
      isClusterStatusFetched: false;
      isClusterStatusForbidden: boolean;
    }
  | {
      isClusterStatusFetched: true;
      isClusterStatusForbidden: false;
      clusterStatusLabel: ClusterStorageItem["clusterStatus"]["clusterData"]["status"];
    }
);

export const getClusterStoreInfo =
  (clusterName: string) =>
  (state: Root): ClusterInfo => {
    const clusterStoreItem = state.clusterStorage[clusterName];
    if (clusterStoreItem?.clusterStatus.dataFetchState === "SUCCESS") {
      return {
        clusterStoreItem,
        isClusterStatusFetched: true,
        isClusterStatusForbidden: false,
        clusterStatusLabel: clusterStoreItem.clusterStatus.clusterData.status,
      };
    }
    return {
      clusterStoreItem,
      isClusterStatusFetched: false,
      isClusterStatusForbidden:
        clusterStoreItem?.clusterStatus.dataFetchState === "FORBIDDEN",
    };
  };
