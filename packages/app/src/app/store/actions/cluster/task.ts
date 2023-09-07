export type ClusterTaskActions = {
  "TASK.VALIDATION.SHOW": {
    type: "TASK.VALIDATION.SHOW";
    key: {clusterName: string | null; task: string};
  };

  "TASK.VALIDATION.HIDE": {
    type: "TASK.VALIDATION.HIDE";
    key: {clusterName: string | null; task: string};
  };
};
