import { api, getAvailResourceAgents } from "app/backend";

export type ResourceAgentListActions = {
  "RESOURCE_AGENT.LIST.LOAD": {
    type: "RESOURCE_AGENT.LIST.LOAD";
    key: { clusterName: string };
  };

  LoadResourceAgentListSuccess: {
    type: "RESOURCE_AGENT.LIST.LOAD.OK";
    key: { clusterName: string };
    payload: {
      apiResourceAgentMap: api.PayloadOf<typeof getAvailResourceAgents>;
    };
  };

  LoadResourceAgentListFailed: {
    type: "RESOURCE_AGENT.LIST.LOAD.FAIL";
    key: { clusterName: string };
  };
};
