import {useTaskCommon} from "../useTaskCommon";

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
        payload: {nodeName, force},
      });
    },

    close: () => {
      dispatch({type: "NODE.STOP.CLOSE"});
      task.close();
    },
  };
};
