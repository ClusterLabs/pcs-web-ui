import {ActionPayload} from "app/store";
import {useClusterTask, useGroupDetailViewContext} from "app/view/share";
import {getInvalidPermissionIndexes} from "app/view/cluster/acl/PermissionAddForm";

export const useTask = () => {
  const task = useClusterTask("aclRolePermissionAdd");
  const {selectedItemUrlName: aclName} = useGroupDetailViewContext();
  const {dispatch, state, clusterName} = task;

  return {
    ...task,

    invalidPermissionIndexes: getInvalidPermissionIndexes(
      state.permissionInfoList,
    ),
    //actions
    updateState: (
      payload: ActionPayload["CLUSTER.ACL.ROLE.PERMISSION.UPDATE"],
    ) =>
      dispatch({
        type: "CLUSTER.ACL.ROLE.PERMISSION.UPDATE",
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

    recoverFromError: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET",
        key: {clusterName, task: task.name},
      });
    },
  };
};
