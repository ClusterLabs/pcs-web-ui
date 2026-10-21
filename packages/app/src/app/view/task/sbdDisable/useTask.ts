import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("sbdDisable");
  const {dispatch} = task;

  return {
    ...task,
    label: "Disable SBD",

    //actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {task: task.name},
      });
      dispatch({type: "CLUSTER.SBD.DISABLE.CLOSE"});
    },

    sbdDisable: ({force}: {force: boolean}) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {task: task.name},
        payload: {
          taskLabel: "disable sbd",
          call: {
            name: "sbd-disable-sbd",
            payload: {
              ignore_offline_nodes: force,
              ...(force ? {force_flags: ["FORCE"]} : {}),
            },
          },
        },
      });
    },
  };
};
