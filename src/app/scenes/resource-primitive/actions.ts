import { ApiAgentMetadata } from "app/common/backend/getResourceAgentMetadata";

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
    apiAgentMetadata: ApiAgentMetadata;
  }
}

export interface LoadResourceAgentFailed {
  type: "RESOURCE_AGENT.LOAD.FAILED";
  payload: {
    agentName: string;
  }
}
