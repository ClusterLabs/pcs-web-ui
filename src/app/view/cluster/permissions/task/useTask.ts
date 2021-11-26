import { useSelector } from "react-redux";

import { ActionPayload, selectors } from "app/store";
import { useClusterTask } from "app/view/share";

const { getClusterPermissions } = selectors;

type AllowName =
  ActionPayload["CLUSTER.PERMISSIONS.SAVE"]["permissionList"][number]["allow"][number];

export const useTask = () => {
  const task = useClusterTask("permissionEdit");
  const { dispatch, clusterName, state } = task;
  const currentPermissionsState = useSelector(
    getClusterPermissions(clusterName),
  );

  const key = { clusterName, task: task.name };
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
    updateState: (payload: ActionPayload["CLUSTER.PERMISSION.EDIT.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.PERMISSION.EDIT.UPDATE",
        key,
        payload,
      }),

    permissionEdit: () => {
      if (currentPermissionsState === null) {
        // it means current permissions are not loaded
        return;
      }
      const currentPermissionList = currentPermissionsState.users_permissions;
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
        payload: { permissionList },
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "CLUSTER.PERMISSIONS.SAVE.ERROR.RECOVER",
        key,
      });
    },
  };
};
