import {ActionPayload} from "app/store";
import {getInvalidPermissionIndexes} from "app/view/cluster/acl/permissions";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("aclRolePermissionAdd");
  const {dispatch, state} = task;
  const {clusterName, roleId} = state;

  type Permissions = typeof state.permissionInfoList;

  const updateState = (
    payload: ActionPayload["CLUSTER.ACL.ROLE.PERMISSION.UPDATE"],
  ) =>
    dispatch({
      type: "CLUSTER.ACL.ROLE.PERMISSION.UPDATE",
      key: {clusterName},
      payload,
    });

  return {
    ...task,
    clusterName,
    label: "Add permissions to role",
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
        type: "CLUSTER.ACL.ROLE.PERMISSION.CLOSE",
        key: {clusterName},
      });
    },

    aclRolePermissionAdd: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: "add permission to role",
          call: {
            name: "acl-add-permission",
            payload: {
              role_id: roleId,
              permission_info_list: state.permissionInfoList.filter(
                permission => permission.length > 0,
              ),
            },
          },
        },
      });
    },
  };
};
