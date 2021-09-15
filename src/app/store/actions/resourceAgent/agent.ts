import { api, libClusterResourceAgentDescribeAgent } from "app/backend";

export type ResourceAgentAgentActions = {
  "RESOURCE_AGENT.LOAD": {
    type: "RESOURCE_AGENT.LOAD";
    key: { clusterName: string };
    payload: {
      agentName: string;
    };
  };

  "RESOURCE_AGENT.LOAD.SUCCESS": {
    type: "RESOURCE_AGENT.LOAD.SUCCESS";
    key: { clusterName: string };
    payload: {
      apiAgentMetadata: api.PayloadOf<
        typeof libClusterResourceAgentDescribeAgent
      >["data"];
    };
  };

  "RESOURCE_AGENT.LOAD.FAILED": {
    type: "RESOURCE_AGENT.LOAD.FAILED";
    key: { clusterName: string };
    payload: {
      agentName: string;
    };
  };

  "RESOURCE_AGENT.ENSURE": {
    type: "RESOURCE_AGENT.ENSURE";
    key: { clusterName: string };
    payload: {
      agentName: string;
    };
  };
};
