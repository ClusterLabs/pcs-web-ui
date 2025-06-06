import type {api, libClusterResourceAgentListAgents} from "app/backend";

export type ResourceAgentListActions = {
  "RESOURCE_AGENT.LIST.LOAD": {
    type: "RESOURCE_AGENT.LIST.LOAD";
    key: {clusterName: string};
  };

  "RESOURCE_AGENT.LIST.LOAD.OK": {
    type: "RESOURCE_AGENT.LIST.LOAD.OK";
    key: {clusterName: string};
    payload: {
      apiResourceAgentList: Extract<
        api.PayloadOf<typeof libClusterResourceAgentListAgents>,
        {status: "success"}
      >["data"];
    };
  };

  "RESOURCE_AGENT.LIST.LOAD.FAIL": {
    type: "RESOURCE_AGENT.LIST.LOAD.FAIL";
    key: {clusterName: string};
  };
};
