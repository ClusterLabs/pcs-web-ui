import { ApiResponse, getResourceAgentMetadata } from "app/backend";

export type ResourceAgentActions = {
  LoadResourceAgent: {
    type: "RESOURCE_AGENT.LOAD";
    payload: {
      agentName: string;
      clusterUrlName: string;
    };
  };

  LoadResourceAgentSuccess: {
    type: "RESOURCE_AGENT.LOAD.SUCCESS";
    payload: {
      clusterUrlName: string;
      apiAgentMetadata: ApiResponse<typeof getResourceAgentMetadata>;
    };
  };

  LoadResourceAgentFailed: {
    type: "RESOURCE_AGENT.LOAD.FAILED";
    payload: {
      clusterUrlName: string;
      agentName: string;
    };
  };
};
