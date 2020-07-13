import { ApiResponse, getFenceAgentMetadata } from "app/backend";

export type FenceAgentActions = {
  LoadFenceAgent: {
    type: "FENCE_AGENT.LOAD";
    payload: {
      agentName: string;
      clusterUrlName: string;
    };
  };

  LoadFenceAgentSuccess: {
    type: "FENCE_AGENT.LOAD.SUCCESS";
    payload: {
      clusterUrlName: string;
      apiAgentMetadata: ApiResponse<typeof getFenceAgentMetadata>;
    };
  };

  LoadFenceAgentFailed: {
    type: "FENCE_AGENT.LOAD.FAILED";
    payload: {
      clusterUrlName: string;
      agentName: string;
    };
  };
};