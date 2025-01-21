import type {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceBan");
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

    updateState: (payload: ActionPayload["RESOURCE.BAN.UPDATE"]) => {
      dispatch({
        type: "RESOURCE.BAN.UPDATE",
        payload,
      });
    },

    ban: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: `ban resource "${state.resourceId}"`,
          call: {
            name: "resource-ban",
            payload: {
              resource_id: state.resourceId,
              ...(state.useNode ? {node: state.node} : {}),
              ...(state.resourceType === "clone" &&
              state.isPromotable &&
              state.limitToPromoted
                ? {master: true}
                : {}),
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
      dispatch({type: "RESOURCE.BAN.CLOSE"});
    },
  };
};
