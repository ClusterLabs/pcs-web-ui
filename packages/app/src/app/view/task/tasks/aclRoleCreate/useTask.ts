import {ActionPayload} from "app/store";
import {useTask as useTaskCommon} from "app/view/share";
import {getInvalidPermissionIndexes} from "app/view/cluster/acl/permissions";

export const useTask = () => {
  const task = useTaskCommon("aclRoleCreate");
  const {dispatch, state} = task;
  const {clusterName} = state;

  type Permissions = typeof state.permissionInfoList;

  const updateState = (
    payload: ActionPayload["CLUSTER.ACL.ROLE.CREATE.UPDATE"],
  ) =>
    dispatch({
      type: "CLUSTER.ACL.ROLE.CREATE.UPDATE",
      key: {clusterName},
      payload,
    });

  return {
    ...task,
    clusterName,
    isNameValid: state.roleId.length > 0,
    invalidPermissionIndexes: getInvalidPermissionIndexes(
      state.permissionInfoList,
    ),

    //actions
    updateState,

    updatePermissions: (transform: (permissions: Permissions) => Permissions) =>
      updateState({permissionInfoList: transform(state.permissionInfoList)}),

    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "CLUSTER.ACL.ROLE.CREATE.CLOSE",
        key: {clusterName},
      });
    },

    aclRoleCreate: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: "create acl role",
          call: {
            name: "acl-create-role",
            payload: {
              role_id: state.roleId,
              permission_info_list: state.permissionInfoList.filter(
                permission => permission.length > 0,
              ),
              description: state.description,
            },
          },
        },
      });
    },
  };
};
