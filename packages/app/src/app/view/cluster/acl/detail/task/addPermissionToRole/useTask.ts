import {ActionPayload} from "app/store";
import {
  useClusterTask,
  useGroupDetailViewContext,
} from "app/view/cluster/share";
import {getInvalidPermissionIndexes} from "app/view/cluster/acl/permissions";

export const useTask = () => {
  const task = useClusterTask("aclRolePermissionAdd");
  const {selectedItemUrlName: aclName} = useGroupDetailViewContext();
  const {dispatch, state, clusterName} = task;

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
              role_id: aclName,
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
