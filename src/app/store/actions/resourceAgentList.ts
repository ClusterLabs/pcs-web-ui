import { api, getAvailResourceAgents } from "app/backend";

export type ResourceAgentListActions = {
  LoadResourceAgentList: {
    type: "RESOURCE_AGENT_LIST.LOAD";
    payload: {
      clusterUrlName: string;
    };
  };

  LoadResourceAgentListSuccess: {
    type: "RESOURCE_AGENT_LIST.LOAD.SUCCESS";
    payload: {
      clusterUrlName: string;
      apiResourceAgentMap: api.PayloadOf<typeof getAvailResourceAgents>;
    };
  };

  LoadResourceAgentListFailed: {
    type: "RESOURCE_AGENT_LIST.LOAD.FAILED";
    payload: {
      clusterUrlName: string;
    };
  };
};
