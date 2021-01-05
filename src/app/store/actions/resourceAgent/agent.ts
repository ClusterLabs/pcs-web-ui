import { api, getResourceAgentMetadata } from "app/backend";

export type ResourceAgentAgentActions = {
  "RESOURCE_AGENT.LOAD": {
    type: "RESOURCE_AGENT.LOAD";
    id: { cluster: string };
    payload: {
      agentName: string;
    };
  };

  "RESOURCE_AGENT.LOAD.SUCCESS": {
    type: "RESOURCE_AGENT.LOAD.SUCCESS";
    id: { cluster: string };
    payload: {
      apiAgentMetadata: api.PayloadOf<typeof getResourceAgentMetadata>;
    };
  };

  "RESOURCE_AGENT.LOAD.FAILED": {
    type: "RESOURCE_AGENT.LOAD.FAILED";
    id: { cluster: string };
    payload: {
      agentName: string;
    };
  };

  "RESOURCE_AGENT.ENSURE": {
    type: "RESOURCE_AGENT.ENSURE";
    id: { cluster: string };
    payload: {
      agentName: string;
    };
  };
};
