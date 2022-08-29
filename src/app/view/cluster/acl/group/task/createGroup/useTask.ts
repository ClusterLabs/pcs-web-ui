import { ActionPayload } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("aclGroupCreate");
  const { dispatch, state, clusterName } = task;

  return {
    ...task,
    isNameValid: state.groupId.length > 0,

    //actions
    updateState: (payload: ActionPayload["CLUSTER.ACL.GROUP.CREATE.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.ACL.GROUP.CREATE.UPDATE",
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
        type: "CLUSTER.ACL.GROUP.CREATE.CLOSE",
        key: { clusterName },
      });
    },

    aclGroupCreate: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: "create acl group",
          call: {
            name: "acl-create-group",
            payload: {
              group_id: state.groupId,
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
