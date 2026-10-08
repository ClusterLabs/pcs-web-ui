import type {ClusterData, Root} from "../types";

import {
  type ClusterSelector as TClusterSelector,
  clusterDataSelector,
} from "./selectorsHelpers";

export const getCibSecrets = clusterDataSelector(
  (clusterData, resourceId: string) => clusterData.cibSecrets[resourceId],
);

export const getPcmkAgent = clusterDataSelector(
  (clusterData, agentName: string) => clusterData.pcmkAgents[agentName],
);

export const getClusterProperties = clusterDataSelector(
  clusterData => clusterData.clusterProperties.data,
);

export type ClusterSelector<
  ARGS extends unknown[],
  SELECTED,
> = TClusterSelector<ARGS, SELECTED>;

export type ExtractClusterSelector<SELECTOR> = SELECTOR extends ClusterSelector<
  // biome-ignore lint/suspicious/noExplicitAny: No worth to improve any now
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
        isBackendNotFoundCase: false;
        data: null;
      };
      permissions: null;
      pcmkAgents: null;
    }
  | {
      isRegistered: true;
      clusterStatus: {
        isForbidden: boolean;
        isBackendNotFoundCase: boolean;
        data: ClusterData["clusterStatus"]["clusterData"];
        load: {when: number; currently: boolean};
      };
      permissions: ClusterData["clusterPermissions"]["data"];
      pcmkAgents: ClusterData["pcmkAgents"];
    };

export const getClusterStoreInfo = (state: Root): ClusterInfo => {
  const clusterData = state.clusterData;
  if (clusterData === null) {
    // A very short init period before first cluster request action is run.
    return {
      isRegistered: false,
      clusterStatus: {
        isForbidden: false,
        isBackendNotFoundCase: false,
        data: null,
      },
      permissions: null,
      pcmkAgents: null,
    };
  }

  const {
    clusterData: data,
    load: {when, currently, result},
  } = clusterData.clusterStatus;
  return {
    isRegistered: true,
    clusterStatus: {
      isForbidden: result === "FORBIDDEN",
      isBackendNotFoundCase: result === "BACKEND_NOT_FOUND",
      data,
      load: {when, currently},
    },
    permissions: clusterData.clusterPermissions.data,
    pcmkAgents: clusterData.pcmkAgents,
  };
};

type PcmkAgent = ClusterData["pcmkAgents"][keyof ClusterData["pcmkAgents"]];

export const getResourceAgentMap =
  (_clusterName: string) =>
  (state: Root): ClusterData["resourceAgentMap"]["data"] =>
    state.clusterData?.resourceAgentMap.data ?? null;

export const getFenceAgentList =
  (_clusterName: string) =>
  (state: Root): ClusterData["fenceAgentList"]["data"] =>
    state.clusterData?.fenceAgentList.data ?? null;

export const getAgentInfo =
  (_clusterName: string, agentName: string) =>
  (
    state: Root,
  ): {
    agent: PcmkAgent;
    isAgentLoaded: boolean;
    isAgentLoadFailed: boolean;
  } | null => {
    const clusterData = state.clusterData;
    if (clusterData === null) {
      return null;
    }

    const agent = clusterData.pcmkAgents[agentName];
    return {
      agent,
      isAgentLoaded:
        agent &&
        (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
      isAgentLoadFailed: agent && agent.loadStatus === "FAILED",
    };
  };
