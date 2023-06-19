import {ActionPayload} from "app/store";
import {useClusterTask, useLoadedCluster} from "app/view/cluster/share";
import {getAssignedSubjectIdList} from "app/view/cluster/acl/detail/tools";

export const useTask = () => {
  const task = useClusterTask("aclSubjectAssign");
  const {dispatch, state, clusterName} = task;
  const {acls} = useLoadedCluster();

  const assigneeType =
    state.sourceObject === "role" ? state.subjectType : "role";

  const assigneeKey = state.sourceObject === "subject" ? "roleId" : "subjectId";
  const assigneeId = state[assigneeKey];

  const alreadyAssigned =
    state.sourceObject === "role"
      ? getAssignedSubjectIdList(acls[state.subjectType] || {}, state.roleId)
      : acls[state.subjectType]?.[state.subjectId] || [];

  return {
    ...task,
    isAssigneeValid:
      state.sourceObject === "subject"
        ? state.roleId.length > 0
        : state.subjectId.length > 0,

    assigneeType,
    assigneeId,
    alreadyAssigned,

    itemsOffer: Object.keys(acls[assigneeType] || {}).filter(
      i => !alreadyAssigned.includes(i),
    ),

    //actions
    open: (payload: ActionPayload["CLUSTER.ACL.SUBJECT_ROLE.ASSIGN"]) => {
      dispatch({
        type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
        key: {clusterName},
        payload,
      });
      task.open();
    },

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
