import { api, libClusterStonithAgentListAgents } from "app/backend";

export type FenceAgentListActions = {
  "FENCE_AGENT.LIST.LOAD": {
    type: "FENCE_AGENT.LIST.LOAD";
    key: { clusterName: string };
  };

  "FENCE_AGENT.LIST.LOAD.OK": {
    type: "FENCE_AGENT.LIST.LOAD.OK";
    key: { clusterName: string };
    payload: {
      apiFenceAgentList: Extract<
        api.PayloadOf<typeof libClusterStonithAgentListAgents>,
        { status: "success" }
      >["data"];
    };
  };

  "FENCE_AGENT.LIST.LOAD.FAIL": {
    type: "FENCE_AGENT.LIST.LOAD.FAIL";
    key: { clusterName: string };
  };
};
