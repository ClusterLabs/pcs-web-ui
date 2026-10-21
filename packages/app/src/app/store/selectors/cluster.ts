import type {ClusterData, Root} from "./types";

export const getCibSecrets = (resourceId: string) => (state: Root) =>
  state.clusterData.cibSecrets[resourceId];

export const getPcmkAgent = (agentName: string) => (state: Root) =>
  state.clusterData.pcmkAgents[agentName];

export const getClusterProperties = (state: Root) =>
  state.clusterData.clusterProperties.data;

type ClusterInfo = {
  clusterStatus: {
    isForbidden: boolean;
    isBackendNotFoundCase: boolean;
    noClusterDetected: boolean;
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
      noClusterDetected: result === "NO_CLUSTER_DETECTED",
      isForbidden: result === "FORBIDDEN",
      isBackendNotFoundCase: result === "BACKEND_NOT_FOUND",
      data,
      load: {when, currently},
    },
    permissions: state.clusterData.clusterPermissions.data,
    pcmkAgents: state.clusterData.pcmkAgents,
  };
};

export const getResourceAgentMap = (state: Root) =>
  state.clusterData.resourceAgentMap.data;

export const getFenceAgentList = (state: Root) =>
  state.clusterData.fenceAgentList.data;

type AgentInfo = {
  agent: ClusterData["pcmkAgents"][keyof ClusterData["pcmkAgents"]];
  isAgentLoaded: boolean;
  isAgentLoadFailed: boolean;
};

export const getAgentInfo =
  (agentName: string) =>
  (state: Root): AgentInfo => {
    const agent = state.clusterData.pcmkAgents[agentName];
    return {
      agent,
      isAgentLoaded:
        agent &&
        (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
      isAgentLoadFailed: agent && agent.loadStatus === "FAILED",
    };
  };
