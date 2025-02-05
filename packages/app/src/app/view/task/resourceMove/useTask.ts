import type {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceMove");
  const {state, dispatch} = task;
  const {clusterName} = state;

  return {
    ...task,
    isNodeSettingConsistent: !state.useNode || state.node.length > 0,
    isConstraintLifetimeConsistent:
      state.constraintHandling !== "expire" ||
      state.constraintLifetime.match(
        /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/,
      ) != null,

    updateState: (payload: ActionPayload["RESOURCE.MOVE.UPDATE"]) => {
      dispatch({
        type: "RESOURCE.MOVE.UPDATE",
        payload,
      });
    },

    move: () => {
      const commonPayload = {
        resource_id: state.resourceId,
        ...(state.useNode ? {node: state.node} : {}),
        ...(state.resourceType === "clone" &&
        state.isPromotable &&
        state.limitToPromoted
          ? {master: true}
          : {}),
      };
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: `move resource "${state.resourceId}"`,
          call:
            state.constraintHandling === "autoclean"
              ? {
                  name: "resource-move-autoclean",
                  payload: {
                    ...commonPayload,
                    ...(state.strictMode ? {strict: true} : {}),
                  },
                }
              : {
                  name: "resource-move",
                  payload: {
                    ...commonPayload,
                    ...(state.constraintHandling === "expire"
                      ? {lifetime: state.constraintLifetime}
                      : {}),
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
