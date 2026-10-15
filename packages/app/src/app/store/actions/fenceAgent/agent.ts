import type {api, libClusterStonithAgentDescribeAgent} from "app/backend";

export type FenceAgentAgentActions = {
  "FENCE_AGENT.LOAD": {
    type: "FENCE_AGENT.LOAD";
    payload: {
      agentName: string;
    };
  };

  "FENCE_AGENT.LOAD.SUCCESS": {
    type: "FENCE_AGENT.LOAD.SUCCESS";
    payload: {
      apiAgentMetadata: Extract<
        api.PayloadOf<typeof libClusterStonithAgentDescribeAgent>,
        {status: "success"}
      >["data"];
    };
  };

  "FENCE_AGENT.LOAD.FAILED": {
    type: "FENCE_AGENT.LOAD.FAILED";
    payload: {
      agentName: string;
    };
  };

  "FENCE_AGENT.ENSURE": {
    type: "FENCE_AGENT.ENSURE";
    payload: {
      agentName: string;
    };
  };
};
