import { ApiResponse, getResourceAgentList } from "app/backend";

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
      apiResourceAgentList: ApiResponse<typeof getResourceAgentList>;
    };
  };

  LoadResourceAgentListFailed: {
    type: "RESOURCE_AGENT_LIST.LOAD.FAILED";
    payload: {
      clusterUrlName: string;
    };
  };
};
