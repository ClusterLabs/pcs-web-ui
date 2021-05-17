export type ResourceCreateActions = {
  "RESOURCE.CREATE.UPDATE": {
    type: "RESOURCE.CREATE.UPDATE";
    key: { clusterName: string };
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
    key: { clusterName: string };
  };
};
