import { ActionPayload } from "app/store";
import { useClusterTask, useGroupDetailViewContext } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("aclGroupAssign");
  const { selectedItemUrlName: aclName } = useGroupDetailViewContext();
  const { dispatch, state, clusterName } = task;

  return {
    ...task,
    isRoleIdValid: state.roleId.length > 0,

    //actions
    updateState: (payload: ActionPayload["CLUSTER.ACL.GROUP.ASSIGN.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.ACL.GROUP.ASSIGN.UPDATE",
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
        type: "CLUSTER.ACL.GROUP.ASSIGN.CLOSE",
        key: { clusterName },
      });
    },

    aclRoleAssign: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: "assign acl role",
          call: {
            name: "acl-assign-role-to-group",
            payload: {
              role_id: state.roleId,
              group_id: aclName,
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
