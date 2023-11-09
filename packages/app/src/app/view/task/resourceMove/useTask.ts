import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceMove");
  const {state, dispatch} = task;

  return {
    ...task,
    move: ({force}: {force: boolean}) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName: state.clusterName, task: task.name},
        payload: {
          taskLabel: `create resource "${state.resourceId}"`,
          call: {
            name: "resource-move-autoclean",
            payload: {
              resource_id: state.resourceId,
              ...(force ? {} : {strict: true}),
            },
          },
        },
      });
    },
  };
};
