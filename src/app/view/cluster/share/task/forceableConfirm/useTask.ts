import { Action } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("forceableConfirm");
  const { dispatch, clusterName } = task;

  return {
    ...task,

    runAction: (action: Action) => {
      dispatch({
        type: "CLUSTER.FORCEABLE-CONFIRM",
        key: { clusterName },
      });
      dispatch(action);
    },

    close: () => {
      dispatch({
        type: "CLUSTER.FORCEABLE-CONFIRM.CLOSE",
        key: { clusterName },
      });
      task.close();
    },
  };
};
