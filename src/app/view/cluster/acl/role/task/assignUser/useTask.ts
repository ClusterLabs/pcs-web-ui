import { ActionPayload } from "app/store";
import { useClusterTask, useGroupDetailViewContext } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("aclUserAssign");
  const { selectedItemUrlName: aclName } = useGroupDetailViewContext();
  const { dispatch, state, clusterName } = task;

  return {
    ...task,
    isUserIdValid: state.userId.length > 0,

    //actions
    updateState: (payload: ActionPayload["CLUSTER.ACL.USER.ASSIGN.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.ACL.USER.ASSIGN.UPDATE",
        key: { clusterName },
        payload,
      }),

    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: { clusterName, task: task.name },
      });
      dispatch({
        type: "CLUSTER.ACL.USER.ASSIGN.CLOSE",
        key: { clusterName },
      });
    },

    aclUserAssign: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: "assign acl user",
          call: {
            name: "acl-assign-role-to-target",
            payload: {
              role_id: aclName,
              target_id: state.userId,
            },
          },
        },
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET",
        key: { clusterName, task: task.name },
      });
    },
  };
};
