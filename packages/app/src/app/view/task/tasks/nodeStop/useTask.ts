import {useTask as useTaskCommon} from "app/view/share";

export const useTask = () => {
  const task = useTaskCommon("nodeStop");

  const {
    state: {clusterName, nodeName},
    dispatch,
  } = task;

  return {
    ...task,
    clusterName,

    nodeStop: ({force}: {force: boolean}) => {
      dispatch({
        type: "NODE.STOP",
        key: {clusterName},
        payload: {nodeName, force},
      });
    },

    close: () => {
      dispatch({
        type: "NODE.STOP.CLOSE",
        key: {clusterName},
      });
      task.close();
    },
  };
};
