import { Action } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("forceableConfirm");
  const { dispatch } = task;

  return {
    ...task,

    runAction: (action: Action) => {
      dispatch({
        type: "TASK.FORCEABLE-CONFIRM",
      });
      dispatch(action);
    },

    close: () => {
      dispatch({
        type: "TASK.FORCEABLE-CONFIRM.CLOSE",
      });
      task.close();
    },
  };
};
