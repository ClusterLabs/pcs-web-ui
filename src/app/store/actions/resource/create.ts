import { api } from "app/backend";

export type ResourceCreateActions = {
  "RESOURCE.CREATE": {
    type: "RESOURCE.CREATE";
    id: { cluster: string };
    payload: {
      resourceName: string;
      agentName: string;
      instanceAttrs: Record<string, string>;
      disabled: boolean;
    };
  };

  "RESOURCE.CREATE.SUCCESS": {
    type: "RESOURCE.CREATE.SUCCESS";
    id: { cluster: string };
    payload: {
      reports: api.types.lib.Report[];
    };
  };

  "RESOURCE.CREATE.ERROR": {
    type: "RESOURCE.CREATE.ERROR";
    id: { cluster: string };
  };

  "RESOURCE.CREATE.FAIL": {
    type: "RESOURCE.CREATE.FAIL";
    id: { cluster: string };
    payload: {
      reports: api.types.lib.Report[];
    };
  };

  "RESOURCE.CREATE.UPDATE": {
    type: "RESOURCE.CREATE.UPDATE";
    id: { cluster: string };
    payload: {
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

  "RESOURCE.CREATE.CLOSE": {
    type: "RESOURCE.CREATE.CLOSE";
    id: { cluster: string };
  };
};
