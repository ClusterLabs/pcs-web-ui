import { api } from "app/backend";

export type ResourceCreateActions = {
  "RESOURCE.CREATE": {
    type: "RESOURCE.CREATE";
    payload: {
      clusterUrlName: string;
      resourceName: string;
      agentName: string;
      instanceAttrs: Record<string, string>;
      disabled: boolean;
    };
  };

  "RESOURCE.CREATE.SUCCESS": {
    type: "RESOURCE.CREATE.SUCCESS";
    payload: {
      clusterUrlName: string;
      reports: api.types.lib.Report[];
    };
  };

  "RESOURCE.CREATE.ERROR": {
    type: "RESOURCE.CREATE.ERROR";
    payload: {
      clusterUrlName: string;
    };
  };

  "RESOURCE.CREATE.FAIL": {
    type: "RESOURCE.CREATE.FAIL";
    payload: {
      clusterUrlName: string;
      reports: api.types.lib.Report[];
    };
  };

  "RESOURCE.CREATE.UPDATE": {
    type: "RESOURCE.CREATE.UPDATE";
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

  "RESOURCE.CREATE.CLOSE": {
    type: "RESOURCE.CREATE.CLOSE";
    payload: {
      clusterUrlName: string;
    };
  };
};
