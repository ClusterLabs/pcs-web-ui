import {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceMove");
  const {state, dispatch} = task;

  return {
    ...task,

    updateState: (payload: ActionPayload["RESOURCE.MOVE.UPDATE"]) => {
      dispatch({
        type: "RESOURCE.MOVE.UPDATE",
        payload,
      });
    },

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
              ...(state.useNode ? {node: state.node} : {}),
              ...(force ? {strict: true} : {}),
            },
          },
        },
      });
    },
  };
};
