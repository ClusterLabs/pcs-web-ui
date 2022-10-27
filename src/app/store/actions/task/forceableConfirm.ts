export type TaskForceableConfirmActions = {
  "TASK.FORCEABLE-CONFIRM": {
    type: "TASK.FORCEABLE-CONFIRM";
  };

  "TASK.FORCEABLE-CONFIRM.OK": {
    type: "TASK.FORCEABLE-CONFIRM.OK";
  };

  "TASK.FORCEABLE-CONFIRM.FAIL": {
    type: "TASK.FORCEABLE-CONFIRM.FAIL";
    payload: {
      message: string;
    };
  };

  "TASK.FORCEABLE-CONFIRM.CLOSE": {
    type: "TASK.FORCEABLE-CONFIRM.CLOSE";
  };
};
