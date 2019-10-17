import { ApiAgentMetadata } from "app/common/backend/resourceAgentMetadata";

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
