import { api, getFenceAgentMetadata } from "app/backend";

export type FenceAgentActions = {
  "FENCE_AGENT.LOAD": {
    type: "FENCE_AGENT.LOAD";
    payload: {
      agentName: string;
      clusterUrlName: string;
    };
  };

  "FENCE_AGENT.LOAD.SUCCESS": {
    type: "FENCE_AGENT.LOAD.SUCCESS";
    payload: {
      clusterUrlName: string;
      apiAgentMetadata: api.PayloadOf<typeof getFenceAgentMetadata>;
    };
  };

  "FENCE_AGENT.LOAD.FAILED": {
    type: "FENCE_AGENT.LOAD.FAILED";
    payload: {
      clusterUrlName: string;
      agentName: string;
    };
  };
};
