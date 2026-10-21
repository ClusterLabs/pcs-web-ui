export type ResourceCreateActions = {
  "RESOURCE.CREATE.INIT": {
    type: "RESOURCE.CREATE.INIT";
    payload: {
      groupIdStructureList: {id: string; resources: {id: string}[]}[];
    };
  };
  "RESOURCE.CREATE.UPDATE": {
    type: "RESOURCE.CREATE.UPDATE";
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
  };
};
