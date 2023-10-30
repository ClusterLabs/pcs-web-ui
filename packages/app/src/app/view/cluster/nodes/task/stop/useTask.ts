import {useClusterTask} from "app/view/cluster/share";

export const useTask = () => {
  const task = useClusterTask("nodeStop");

  const {
    clusterName,
    state: {nodeName},
    dispatch,
  } = task;

  return {
    ...task,

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
