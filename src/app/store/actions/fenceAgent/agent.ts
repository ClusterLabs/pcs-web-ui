import {api, libClusterStonithAgentDescribeAgent} from "app/backend";

export type FenceAgentAgentActions = {
  "FENCE_AGENT.LOAD": {
    type: "FENCE_AGENT.LOAD";
    key: {clusterName: string};
    payload: {
      agentName: string;
    };
  };

  "FENCE_AGENT.LOAD.SUCCESS": {
    type: "FENCE_AGENT.LOAD.SUCCESS";
    key: {clusterName: string};
    payload: {
      apiAgentMetadata: Extract<
        api.PayloadOf<typeof libClusterStonithAgentDescribeAgent>,
        {status: "success"}
      >["data"];
    };
  };

  "FENCE_AGENT.LOAD.FAILED": {
    type: "FENCE_AGENT.LOAD.FAILED";
    key: {clusterName: string};
    payload: {
      agentName: string;
    };
  };

  "FENCE_AGENT.ENSURE": {
    type: "FENCE_AGENT.ENSURE";
    key: {clusterName: string};
    payload: {
      agentName: string;
    };
  };
};
