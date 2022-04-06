type Owner = {
  type:
    | "node-utilization"
    | "resource-utilization"
    | "node-attr"
    | "resource-meta";
  id: string;
};

export type ClusterNVPairListActions = {
  "CLUSTER.NVPAIRS.SAVE": {
    type: "CLUSTER.NVPAIRS.SAVE";
    key: { clusterName: string; task: string };
    payload: {
      owner: Owner;
      name: string;
      value: string;
    };
  };

  "CLUSTER.NVPAIRS.SAVE.OK": {
    type: "CLUSTER.NVPAIRS.SAVE.OK";
  };

  "CLUSTER.NVPAIRS.SAVE.ERROR": {
    type: "CLUSTER.NVPAIRS.SAVE.ERROR";
    payload: {
      message: string;
    };
  };

  "CLUSTER.NVPAIRS.SAVE.ERROR.RECOVER": {
    type: "CLUSTER.NVPAIRS.SAVE.ERROR.RECOVER";
    key: { clusterName: string; task: string };
  };

  "CLUSTER.NVPAIRS.EDIT": {
    type: "CLUSTER.NVPAIRS.EDIT";
    key: { clusterName: string; task: string };
    payload: (
      | { type: "create" }
      | {
          type: "update";
          name: string;
          value: string;
        }
    ) & {
      owner: Owner;
      nameList: string[];
    };
  };

  "CLUSTER.NVPAIRS.EDIT.UPDATE": {
    type: "CLUSTER.NVPAIRS.EDIT.UPDATE";
    payload: {
      name?: string;
      value?: string;
    };
    key: { clusterName: string; task: string };
  };

  "CLUSTER.NVPAIRS.EDIT.CLOSE": {
    type: "CLUSTER.NVPAIRS.EDIT.CLOSE";
    key: { clusterName: string; task: string };
  };
};
