import { api, getFenceAgentMetadata } from "app/backend";

export type FenceAgentActions = {
  "FENCE_AGENT.LOAD": {
    type: "FENCE_AGENT.LOAD";
    key: { clusterName: string };
    payload: {
      agentName: string;
    };
  };

  "FENCE_AGENT.LOAD.SUCCESS": {
    type: "FENCE_AGENT.LOAD.SUCCESS";
    key: { clusterName: string };
    payload: {
      apiAgentMetadata: api.PayloadOf<typeof getFenceAgentMetadata>;
    };
  };

  "FENCE_AGENT.LOAD.FAILED": {
    type: "FENCE_AGENT.LOAD.FAILED";
    key: { clusterName: string };
    payload: {
      agentName: string;
    };
  };
};
