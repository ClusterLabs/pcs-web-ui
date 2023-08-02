import {useClusterTask} from "app/view/cluster/share";

export const useTask = () => {
  const task = useClusterTask("sbdDisable");
  const {dispatch, clusterName} = task;

  return {
    ...task,
    label: "Disable SBD",

    //actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "CLUSTER.SBD.DISABLE.CLOSE",
        key: {clusterName},
      });
    },

    sbdDisable: ({force}: {force: boolean}) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: "disable sbd",
          call: {
            name: "sbd-disable-sbd",
            payload: {
              ignore_offline_nodes: force,
            },
          },
        },
      });
    },
  };
};
