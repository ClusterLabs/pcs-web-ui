import {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceClear");
  const {state, dispatch} = task;
  const {clusterName} = state;

  return {
    ...task,
    isNodeSettingConsistent: !state.useNode || state.node.length > 0,

    updateState: (payload: ActionPayload["RESOURCE.CLEAR.UPDATE"]) => {
      dispatch({
        type: "RESOURCE.CLEAR.UPDATE",
        payload,
      });
    },

    clear: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: `clear resource "${state.resourceId}"`,
          call: {
            name: "resource-unmove_unban",
            payload: {
              resource_id: state.resourceId,
              ...(state.useNode ? {node: state.node} : {}),
              ...(state.resourceType === "clone" && state.isPromotable
                ? {master: state.limitToPromoted}
                : {}),
              ...(state.expiredOnly ? {expired: true} : {}),
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
      dispatch({type: "RESOURCE.CLEAR.CLOSE"});
    },
  };
};
