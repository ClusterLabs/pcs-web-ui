import { api, getResourceAgentMetadata } from "app/backend";

export type ResourceAgentAgentActions = {
  "RESOURCE_AGENT.LOAD": {
    type: "RESOURCE_AGENT.LOAD";
    payload: {
      agentName: string;
      clusterUrlName: string;
    };
  };

  "RESOURCE_AGENT.LOAD.SUCCESS": {
    type: "RESOURCE_AGENT.LOAD.SUCCESS";
    payload: {
      clusterUrlName: string;
      apiAgentMetadata: api.PayloadOf<typeof getResourceAgentMetadata>;
    };
  };

  "RESOURCE_AGENT.LOAD.FAILED": {
    type: "RESOURCE_AGENT.LOAD.FAILED";
    payload: {
      clusterUrlName: string;
      agentName: string;
    };
  };

  "RESOURCE_AGENT.ENSURE": {
    type: "RESOURCE_AGENT.ENSURE";
    payload: {
      clusterUrlName: string;
      agentName: string;
    };
  };
};
