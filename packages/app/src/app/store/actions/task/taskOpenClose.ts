export type TaskOpenCloseActions = {
  "TASK.OPEN": {
    type: "TASK.OPEN";
    payload: {
      taskKey: string;
    };
  };

  "TASK.CLOSE": {
    type: "TASK.CLOSE";
  };

  "TASK.CLUSTER.OPEN": {
    type: "TASK.CLUSTER.OPEN";
    payload: {
      taskKey: string;
    };
  };

  "TASK.CLUSTER.CLOSE": {
    type: "TASK.CLUSTER.CLOSE";
  };
};
