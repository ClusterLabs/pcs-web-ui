export type ResourceGroupCreateActions = {
  "RESOURCE.GROUP.CREATE.UPDATE": {
    type: "RESOURCE.GROUP.CREATE.UPDATE";
    payload: {
      clusterName: string;
      state: {
        groupName?: string;
      };
    };
  };
};
