import type {api, libClusterResourceAgentDescribeAgent} from "app/backend";

export type ResourceAgentAgentActions = {
  "RESOURCE_AGENT.LOAD": {
    type: "RESOURCE_AGENT.LOAD";
    payload: {
      agentName: string;
    };
  };

  "RESOURCE_AGENT.LOAD.SUCCESS": {
    type: "RESOURCE_AGENT.LOAD.SUCCESS";
    payload: {
      apiAgentMetadata: Extract<
        api.PayloadOf<typeof libClusterResourceAgentDescribeAgent>,
        {status: "success"}
      >["data"];
    };
  };

  "RESOURCE_AGENT.LOAD.FAILED": {
    type: "RESOURCE_AGENT.LOAD.FAILED";
    payload: {
      agentName: string;
    };
  };

  "RESOURCE_AGENT.ENSURE": {
    type: "RESOURCE_AGENT.ENSURE";
    payload: {
      agentName: string;
    };
  };
};
