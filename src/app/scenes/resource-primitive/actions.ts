import { getResourceAgentMetadata, ApiResponse } from "app/common/backend";

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
    apiAgentMetadata: ApiResponse<typeof getResourceAgentMetadata>;
  }
}

export interface LoadResourceAgentFailed {
  type: "RESOURCE_AGENT.LOAD.FAILED";
  payload: {
    agentName: string;
  }
}
