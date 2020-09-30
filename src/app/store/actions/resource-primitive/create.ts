import { api } from "app/backend";

export type CreateResource = {
  type: "RESOURCE.PRIMITIVE.CREATE";
  payload: {
    clusterUrlName: string;
    resourceName: string;
    agentName: string;
    instanceAttrs: Record<string, string>;
    disabled: boolean;
  };
};

export type CreateResourceSuccess = {
  type: "RESOURCE.PRIMITIVE.CREATE.SUCCESS";
  payload: {
    clusterUrlName: string;
    reports: api.types.libraryResponse.ApiReport[];
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
    reports: api.types.libraryResponse.ApiReport[];
  };
};

export type Update = {
  type: "RESOURCE.PRIMITIVE.CREATE.UPDATE";
  payload: {
    clusterUrlName: string;
    state: {
      agentName?: string;
      resourceName?: string;
      clone?: boolean;
      promotable?: boolean;
      disabled?: boolean;
      instanceAttrs?: Record<string, string>;
      useGroup?: "no" | "existing" | "new";
      group?: string;
    };
  };
};

export type ValidationShow = {
  type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.SHOW";
  payload: {
    clusterUrlName: string;
  };
};

export type ValidationHide = {
  type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.HIDE";
  payload: {
    clusterUrlName: string;
  };
};

export type Close = {
  type: "RESOURCE.PRIMITIVE.CREATE.CLOSE";
  payload: {
    clusterUrlName: string;
  };
};
