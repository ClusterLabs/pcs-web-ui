import { getResourceAgentMetadata } from "app/common/backend";

export interface LoadResourceAgent {
  type: "RESOURCE_AGENT.LOAD";
  payload: {
    agentName: string;
    clusterUrlName: string;
  };
}

export interface LoadResourceAgentSuccess {
  type: "RESOURCE_AGENT.LOAD.SUCCESS";
  payload: {
    apiAgentMetadata: getResourceAgentMetadata.Result;
  }
}

export interface LoadResourceAgentFailed {
  type: "RESOURCE_AGENT.LOAD.FAILED";
  payload: {
    agentName: string;
  }
}
