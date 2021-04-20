export type ClusterTaskActions = {
  "CLUSTER.TASK.VALIDATION.SHOW": {
    type: "CLUSTER.TASK.VALIDATION.SHOW";
    key: { clusterName: string };
  };

  "CLUSTER.TASK.VALIDATION.HIDE": {
    type: "CLUSTER.TASK.VALIDATION.HIDE";
    key: { clusterName: string };
  };
};
