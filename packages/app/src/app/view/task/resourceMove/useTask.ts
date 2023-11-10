import {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceMove");
  const {state, dispatch} = task;
  const {clusterName} = state;

  return {
    ...task,
    isNodeSettingConsistent: !state.useNode || state.node.length > 0,

    updateState: (payload: ActionPayload["RESOURCE.MOVE.UPDATE"]) => {
      dispatch({
        type: "RESOURCE.MOVE.UPDATE",
        payload,
      });
    },

    move: ({force}: {force: boolean}) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
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

    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({type: "RESOURCE.MOVE.CLOSE"});
    },
  };
};
