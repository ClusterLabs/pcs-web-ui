import { useClusterTask } from "app/view/share";
import { ActionPayload } from "app/store";

export const useTask = () => {
  const task = useClusterTask("utilizationEdit");
  const { dispatch, clusterName, state } = task;

  const key = { clusterName, task: task.name };
  return {
    ...task,
    isValueValid: /^([1-9]\d*)$/.test(state.value),
    isNameValid: state.name.length > 0,
    open: (payload: ActionPayload["CLUSTER.UTILIZATION.EDIT"]) => {
      dispatch({
        type: "CLUSTER.UTILIZATION.EDIT",
        key,
        payload,
      });
      task.open();
    },

    updateState: (payload: ActionPayload["CLUSTER.UTILIZATION.EDIT.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.UTILIZATION.EDIT.UPDATE",
        key,
        payload,
      }),

    attrSet: () => {
      dispatch({
        type: "CLUSTER.UTILIZATION.SAVE",
        key: { clusterName, task: task.name },
        payload: {
          owner: state.owner,
          name: state.name,
          value: state.value,
        },
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "CLUSTER.UTILIZATION.SAVE.ERROR.RECOVER",
        key,
      });
    },

    close: () => {
      dispatch({
        type: "CLUSTER.UTILIZATION.EDIT.CLOSE",
        key,
      });
      task.close();
    },
  };
};
