import {ClusterStorageItem, Root} from "../types";

import {
  ClusterSelector as TClusterSelector,
  clusterStorageItemSelector,
} from "./selectorsHelpers";

export const getPcmkAgent = clusterStorageItemSelector(
  (clusterStorageItem, agentName: string) =>
    clusterStorageItem.pcmkAgents[agentName],
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
      uiState: null;
    }
  | {
      isRegistered: true;
      clusterStatus: {
        isForbidden: boolean;
        data: ClusterStorageItem["clusterStatus"]["clusterData"];
        load: {when: number; currently: boolean};
      };
      permissions: ClusterStorageItem["clusterPermissions"]["data"];
      resourceAgentMap: ClusterStorageItem["resourceAgentMap"]["data"];
      fenceAgentList: ClusterStorageItem["fenceAgentList"]["data"];
      pcmkAgents: ClusterStorageItem["pcmkAgents"];
      uiState: {
        resourceOpenedItems: ClusterStorageItem["resourceTree"];
      };
    };

export const getClusterStoreInfo =
  (clusterName: string) =>
  (state: Root): ClusterInfo => {
    const clusterStoreItem = state.clusterStorage[clusterName];
    if (clusterStoreItem === undefined) {
      // A very short init period before first cluster request action is run.
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
        uiState: null,
      };
    }

    const {
      clusterData: data,
      load: {when, currently, result},
    } = clusterStoreItem.clusterStatus;
    return {
      isRegistered: true,
      clusterStatus: {
        isForbidden: result === "FORBIDDEN",
        data,
        load: {when, currently},
      },
      permissions: clusterStoreItem.clusterPermissions.data,
      resourceAgentMap: clusterStoreItem.resourceAgentMap.data,
      fenceAgentList: clusterStoreItem.fenceAgentList.data,
      pcmkAgents: clusterStoreItem.pcmkAgents,
      uiState: {
        resourceOpenedItems: clusterStoreItem.resourceTree,
      },
    };
  };

type PcmkAgent =
  ClusterStorageItem["pcmkAgents"][keyof ClusterStorageItem["pcmkAgents"]];

export const getResourceAgentMap =
  (clusterName: string) =>
  (state: Root): ClusterStorageItem["resourceAgentMap"]["data"] =>
    state.clusterStorage[clusterName]?.resourceAgentMap.data ?? null;

export const getFenceAgentList =
  (clusterName: string) =>
  (state: Root): ClusterStorageItem["fenceAgentList"]["data"] =>
    state.clusterStorage[clusterName]?.fenceAgentList.data ?? null;

export const getAgentInfo =
  (clusterName: string, agentName: string) =>
  (
    state: Root,
  ): {
    agent: PcmkAgent;
    isAgentLoaded: boolean;
    isAgentLoadFailed: boolean;
  } | null => {
    const clusterStoreItem = state.clusterStorage[clusterName];
    if (clusterStoreItem === undefined) {
      return null;
    }

    const agent = clusterStoreItem.pcmkAgents[agentName];
    return {
      agent,
      isAgentLoaded:
        agent
        && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
      isAgentLoadFailed: agent && agent.loadStatus === "FAILED",
    };
  };
