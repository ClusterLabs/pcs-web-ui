import { ActionPayload } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("aclSubjectAssign");
  const { dispatch, state, clusterName } = task;

  return {
    ...task,
    isAssigneeValid:
      state.sourceObject === "subject"
        ? state.roleId.length > 0
        : state.subjectId.length > 0,

    //actions
    open: (payload: ActionPayload["CLUSTER.ACL.SUBJECT_ROLE.ASSIGN"]) => {
      dispatch({
        type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
        key: { clusterName },
        payload,
      });
      task.open();
    },

    updateState: (
      payload: ActionPayload["CLUSTER.ACL.SUBJECT.ASSIGN.UPDATE"],
    ) =>
      dispatch({
        type: "CLUSTER.ACL.SUBJECT.ASSIGN.UPDATE",
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
        type: "CLUSTER.ACL.SUBJECT.ASSIGN.CLOSE",
        key: { clusterName },
      });
    },

    assign: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: `assign acl ${state.subjectType}`,
          call:
            state.subjectType === "user"
              ? {
                  name: "acl-assign-role-to-target",
                  payload: {
                    role_id: state.roleId,
                    target_id: state.subjectId,
                  },
                }
              : {
                  name: "acl-assign-role-to-group",
                  payload: {
                    group_id: state.subjectId,
                    role_id: state.roleId,
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
