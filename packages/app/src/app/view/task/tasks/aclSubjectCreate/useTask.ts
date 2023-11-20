import {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("aclSubjectCreate");
  const {dispatch, state} = task;
  const {clusterName} = state;

  return {
    ...task,
    clusterName,

    isNameValid: state.subjectId.length > 0,
    availableRoles: Object.keys(state.roleMap).filter(
      r => !state.roleList.includes(r),
    ),

    //actions
    updateState: (
      payload: ActionPayload["CLUSTER.ACL.SUBJECT.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CLUSTER.ACL.SUBJECT.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),

    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "CLUSTER.ACL.SUBJECT.CREATE.CLOSE",
        key: {clusterName},
      });
    },

    createSubject: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: `create acl ${state.subjectType}`,
          call:
            state.subjectType === "user"
              ? {
                  name: "acl-create-target",
                  payload: {
                    target_id: state.subjectId,
                    role_list: state.roleList.filter(role => role.length > 0),
                  },
                }
              : {
                  name: "acl-create-group",
                  payload: {
                    group_id: state.subjectId,
                    role_list: state.roleList.filter(role => role.length > 0),
                  },
                },
        },
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET",
        key: {task: task.name},
      });
    },
  };
};
