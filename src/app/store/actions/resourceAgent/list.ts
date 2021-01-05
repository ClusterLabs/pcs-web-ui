import { api, getAvailResourceAgents } from "app/backend";

export type ResourceAgentListActions = {
  "RESOURCE_AGENT.LIST.LOAD": {
    type: "RESOURCE_AGENT.LIST.LOAD";
    id: { cluster: string };
  };

  LoadResourceAgentListSuccess: {
    type: "RESOURCE_AGENT.LIST.LOAD.OK";
    id: { cluster: string };
    payload: {
      apiResourceAgentMap: api.PayloadOf<typeof getAvailResourceAgents>;
    };
  };

  LoadResourceAgentListFailed: {
    type: "RESOURCE_AGENT.LIST.LOAD.FAIL";
    id: { cluster: string };
  };
};
