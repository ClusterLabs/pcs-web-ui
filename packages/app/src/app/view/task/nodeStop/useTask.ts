import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("nodeStop");

  const {
    state: {nodeName},
    dispatch,
  } = task;

  return {
    ...task,

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
