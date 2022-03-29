type Owner = { type: "node" | "resource"; id: string };

export type ClusterUtilizationActions = {
  "CLUSTER.UTILIZATION.SAVE": {
    type: "CLUSTER.UTILIZATION.SAVE";
    key: { clusterName: string; task: string };
    payload: {
      owner: Owner;
      name: string;
      value: string;
    };
  };

  "CLUSTER.UTILIZATION.SAVE.OK": {
    type: "CLUSTER.UTILIZATION.SAVE.OK";
  };

  "CLUSTER.UTILIZATION.SAVE.ERROR": {
    type: "CLUSTER.UTILIZATION.SAVE.ERROR";
    payload: {
      message: string;
    };
  };

  "CLUSTER.UTILIZATION.SAVE.ERROR.RECOVER": {
    type: "CLUSTER.UTILIZATION.SAVE.ERROR.RECOVER";
    key: { clusterName: string; task: string };
  };

  "CLUSTER.UTILIZATION.EDIT": {
    type: "CLUSTER.UTILIZATION.EDIT";
    key: { clusterName: string; task: string };
    payload: (
      | { type: "create" }
      | {
          type: "update";
          name: string;
          value: string;
        }
    ) & { owner: Owner };
  };

  "CLUSTER.UTILIZATION.EDIT.UPDATE": {
    type: "CLUSTER.UTILIZATION.EDIT.UPDATE";
    payload: {
      name?: string;
      value?: string;
    };
    key: { clusterName: string; task: string };
  };

  "CLUSTER.UTILIZATION.EDIT.CLOSE": {
    type: "CLUSTER.UTILIZATION.EDIT.CLOSE";
    key: { clusterName: string; task: string };
  };
};
