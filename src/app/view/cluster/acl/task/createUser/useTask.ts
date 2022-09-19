import { ActionPayload } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("aclUserCreate");
  const { dispatch, state, clusterName } = task;

  return {
    ...task,
    isNameValid: state.userId.length > 0,

    //actions
    updateState: (payload: ActionPayload["CLUSTER.ACL.USER.CREATE.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.ACL.USER.CREATE.UPDATE",
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
        type: "CLUSTER.ACL.USER.CREATE.CLOSE",
        key: { clusterName },
      });
    },

    aclUserCreate: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: "create acl user",
          call: {
            name: "acl-create-target",
            payload: {
              target_id: state.userId,
              role_list: state.roleList.filter(role => role.length > 0),
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
