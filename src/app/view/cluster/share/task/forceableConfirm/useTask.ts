import { Action } from "app/store";
import { useTask as useCommonTask } from "app/view/share";

export const useTask = () => {
  const task = useCommonTask("forceableConfirm");
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
