import type {api, libClusterResourceAgentListAgents} from "app/backend";

export type ResourceAgentListActions = {
  "RESOURCE_AGENT.LIST.LOAD": {
    type: "RESOURCE_AGENT.LIST.LOAD";
  };

  "RESOURCE_AGENT.LIST.LOAD.OK": {
    type: "RESOURCE_AGENT.LIST.LOAD.OK";
    payload: {
      apiResourceAgentList: Extract<
        api.PayloadOf<typeof libClusterResourceAgentListAgents>,
        {status: "success"}
      >["data"];
    };
  };

  "RESOURCE_AGENT.LIST.LOAD.FAIL": {
    type: "RESOURCE_AGENT.LIST.LOAD.FAIL";
  };
};
