import {ActionPayload} from "app/store";
import {useClusterTask} from "app/view/share";
import {useLoadedPermissions} from "app/view/cluster/permissions/LoadedPermissionsContext";

type AllowName =
  ActionPayload["CLUSTER.PERMISSIONS.SAVE"]["permissionList"][number]["allow"][number];

export const useTask = () => {
  const task = useClusterTask("permissionEdit");
  const {dispatch, clusterName, state} = task;
  const {users_permissions: currentPermissionList} = useLoadedPermissions();

  const key = {clusterName, task: task.name};
  return {
    ...task,
    open: (payload: ActionPayload["CLUSTER.PERMISSIONS.EDIT"]) => {
      dispatch({
        type: "CLUSTER.PERMISSIONS.EDIT",
        key,
        payload,
      });
      task.open();
    },

    isNameValid: state.name.length > 0,
    areCompetenciesValid:
      state.read || state.write || state.grant || state.full,
    updateState: (payload: ActionPayload["CLUSTER.PERMISSION.EDIT.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.PERMISSION.EDIT.UPDATE",
        key,
        payload,
      }),

    permissionEdit: () => {
      const initialPermission = state.initialPermission;

      const allow: AllowName[] = [
        ...(state.read ? ["read" as AllowName] : []),
        ...(state.write ? ["write" as AllowName] : []),
        ...(state.grant ? ["grant" as AllowName] : []),
        ...(state.full ? ["full" as AllowName] : []),
      ];
      const editPermission = {
        name: state.name,
        type: state.type,
        allow,
      };
      let permissionList;
      if (initialPermission === null) {
        permissionList = [...currentPermissionList, editPermission];
      } else {
        permissionList = currentPermissionList.map(p =>
          p.name !== initialPermission.name || p.type !== initialPermission.type
            ? p
            : editPermission,
        );
      }

      dispatch({
        type: "CLUSTER.PERMISSIONS.SAVE",
        key,
        payload: {permissionList},
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "CLUSTER.PERMISSIONS.SAVE.ERROR.RECOVER",
        key,
      });
    },

    close: () => {
      dispatch({
        type: "CLUSTER.PERMISSIONS.EDIT.CLOSE",
        key,
      });
      task.close();
    },
  };
};
