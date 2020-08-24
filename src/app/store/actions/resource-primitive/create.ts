import { types } from "app/backend";

export type CreateResource = {
  type: "RESOURCE.PRIMITIVE.CREATE";
  payload: {
    clusterUrlName: string;
    resourceName: string;
    agentName: string;
    instanceAttrs: Record<string, string>;
  };
};

export type CreateResourceSuccess = {
  type: "RESOURCE.PRIMITIVE.CREATE.SUCCESS";
  payload: {
    clusterUrlName: string;
    reports: types.libraryResponse.ApiResponse[];
  };
};

export type CreateResourceError = {
  type: "RESOURCE.PRIMITIVE.CREATE.ERROR";
  payload: {
    clusterUrlName: string;
  };
};

export type CreateResourceFailed = {
  type: "RESOURCE.PRIMITIVE.CREATE.FAILED";
  payload: {
    clusterUrlName: string;
    reports: types.libraryResponse.ApiResponse[];
  };
};

export type SetAgentName = {
  type: "RESOURCE.PRIMITIVE.CREATE.SET_AGENT_NAME";
  payload: {
    clusterUrlName: string;
    agentName: string;
  };
};

export type SetResourceName = {
  type: "RESOURCE.PRIMITIVE.CREATE.SET_RESOURCE_NAME";
  payload: {
    clusterUrlName: string;
    resourceName: string;
  };
};

export type SetInstanceAttribute = {
  type: "RESOURCE.PRIMITIVE.CREATE.SET_INSTANCE_ATTRIBUTE";
  payload: {
    clusterUrlName: string;
    name: string;
    value: string;
  };
};

export type Close = {
  type: "RESOURCE.PRIMITIVE.CREATE.CLOSE";
  payload: {
    clusterUrlName: string;
  };
};
