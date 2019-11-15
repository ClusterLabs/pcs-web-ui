import { getResourceAgentMetadata, ApiResponse } from "app/common/backend";

export type PrimitiveResourceActions = {
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
      apiAgentMetadata: ApiResponse<typeof getResourceAgentMetadata>;
    }
  };

  LoadResourceAgentFailed: {
    type: "RESOURCE_AGENT.LOAD.FAILED";
    payload: {
      agentName: string;
    }
  };
}
