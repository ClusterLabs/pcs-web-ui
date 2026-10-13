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

type ClusterInfo = {
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
  const {
    clusterData: data,
    load: {when, currently, result},
  } = state.clusterData.clusterStatus;
  return {
    clusterStatus: {
      isForbidden: result === "FORBIDDEN",
      isBackendNotFoundCase: result === "BACKEND_NOT_FOUND",
      data,
      load: {when, currently},
    },
    permissions: state.clusterData.clusterPermissions.data,
    pcmkAgents: state.clusterData.pcmkAgents,
  };
};

type PcmkAgent = ClusterData["pcmkAgents"][keyof ClusterData["pcmkAgents"]];

export const getResourceAgentMap = (state: Root) =>
  state.clusterData.resourceAgentMap.data;

export const getFenceAgentList = (state: Root) =>
  state.clusterData.fenceAgentList.data;

export const getAgentInfo =
  (agentName: string) =>
  (
    state: Root,
  ): {
    agent: PcmkAgent;
    isAgentLoaded: boolean;
    isAgentLoadFailed: boolean;
  } => {
    const agent = state.clusterData.pcmkAgents[agentName];
    return {
      agent,
      isAgentLoaded:
        agent &&
        (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
      isAgentLoadFailed: agent && agent.loadStatus === "FAILED",
    };
  };
