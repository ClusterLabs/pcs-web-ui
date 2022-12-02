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

type ClusterInfo =
  | {
      isRegistered: false;
      clusterStatus: {
        isForbidden: false;
        data: null;
      };
      permissions: null;
      resourceAgentMap: null;
      fenceAgentList: null;
      pcmkAgents: null;
      tasks: null;
      uiState: null;
    }
  | {
      isRegistered: true;
      clusterStatus: {
        isForbidden: boolean;
        data: ClusterStorageItem["clusterStatus"]["clusterData"];
      };
      permissions: ClusterStorageItem["clusterPermissions"]["data"];
      resourceAgentMap: ClusterStorageItem["resourceAgentMap"]["data"];
      fenceAgentList: ClusterStorageItem["fenceAgentList"]["data"];
      pcmkAgents: ClusterStorageItem["pcmkAgents"];
      tasks: {[K in ClusterTaskKeys]: ClusterStorageItem["tasks"][K]};
      uiState: {
        resourceOpenedItems: ClusterStorageItem["resourceTree"];
      };
    };

export const getClusterStoreInfo =
  (clusterName: string) =>
  (state: Root): ClusterInfo => {
    const clusterStoreItem = state.clusterStorage[clusterName];
    if (clusterStoreItem === undefined) {
      return {
        isRegistered: false,
        clusterStatus: {
          isForbidden: false,
          data: null,
        },
        permissions: null,
        resourceAgentMap: null,
        fenceAgentList: null,
        pcmkAgents: null,
        tasks: null,
        uiState: null,
      };
    }

    return {
      isRegistered: true,
      clusterStatus: {
        isForbidden:
          clusterStoreItem.clusterStatus.dataFetchState === "FORBIDDEN",
        data: clusterStoreItem.clusterStatus.clusterData,
      },
      permissions: clusterStoreItem.clusterPermissions.data,
      resourceAgentMap: clusterStoreItem.resourceAgentMap.data,
      fenceAgentList: clusterStoreItem.fenceAgentList.data,
      pcmkAgents: clusterStoreItem.pcmkAgents,
      tasks: clusterStoreItem.tasks,
      uiState: {
        resourceOpenedItems: clusterStoreItem.resourceTree,
      },
    };
  };
