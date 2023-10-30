import {useTask as useCommonTask} from "app/view/share";

export const useTask = () => {
  const task = useCommonTask("clusterStop");

  const {
    state: {clusterName},
    dispatch,
  } = task;

  return {
    ...task,

    clusterStop: ({force}: {force: boolean}) => {
      dispatch({
        type: "CLUSTER.STOP",
        payload: {clusterName, force},
      });
    },

    close: () => {
      dispatch({
        type: "CLUSTER.STOP.CLOSE",
      });
      task.close();
    },
  };
};
