export type ClusterTaskActions = {
  "TASK.VALIDATION.SHOW": {
    type: "TASK.VALIDATION.SHOW";
    key: {task: string};
  };

  "TASK.VALIDATION.HIDE": {
    type: "TASK.VALIDATION.HIDE";
    key: {task: string};
  };
};
