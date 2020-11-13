import { api, getAvailResourceAgents } from "app/backend";

export type ResourceAgentListActions = {
  "RESOURCE_AGENT.LIST.LOAD": {
    type: "RESOURCE_AGENT.LIST.LOAD";
    payload: {
      clusterUrlName: string;
    };
  };

  LoadResourceAgentListSuccess: {
    type: "RESOURCE_AGENT.LIST.LOAD.OK";
    payload: {
      clusterUrlName: string;
      apiResourceAgentMap: api.PayloadOf<typeof getAvailResourceAgents>;
    };
  };

  LoadResourceAgentListFailed: {
    type: "RESOURCE_AGENT.LIST.LOAD.FAIL";
    payload: {
      clusterUrlName: string;
    };
  };
};
