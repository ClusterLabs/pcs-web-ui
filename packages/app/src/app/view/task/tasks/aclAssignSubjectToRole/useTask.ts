import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("aclSubjectAssign");
  const {dispatch, state} = task;
  const {clusterName} = state;

  const assigneeType =
    state.sourceObject === "role" ? state.subjectType : "role";

  const assigneeKey = state.sourceObject === "subject" ? "roleId" : "subjectId";
  const assigneeId = state[assigneeKey];

  return {
    ...task,
    clusterName,
    label: `Assign ${assigneeType}`,
    isAssigneeValid:
      state.sourceObject === "subject"
        ? state.roleId.length > 0
        : state.subjectId.length > 0,

    assigneeType,
    assigneeId,

    assignableitems: state.assignableItems.filter(
      i => !state.alreadyAssigned.includes(i),
    ),

    //actions
    updateAssigneeId: (id: string) =>
      dispatch({
        type: "CLUSTER.ACL.SUBJECT.ASSIGN.UPDATE",
        key: {clusterName},
        payload: {
          [assigneeKey]: id,
        },
      }),

    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "CLUSTER.ACL.SUBJECT.ASSIGN.CLOSE",
        key: {clusterName},
      });
    },

    assign: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
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
  };
};
