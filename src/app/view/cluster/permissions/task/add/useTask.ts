import {ActionMap, ActionPayload} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";
import {useLoadedPermissions} from "app/view/cluster/permissions/LoadedPermissionsContext";
import {useTaskOpenClose} from "app/view/share";

type AllowName =
  ActionPayload["CLUSTER.PERMISSIONS.SAVE"]["permissionList"][number]["allow"][number];

const taskName: ActionMap["CLUSTER.PERMISSIONS.SAVE"]["key"]["task"] =
  "permissionEdit";

export const useTask = () => {
  const dispatch = useDispatch();
  const openClose = useTaskOpenClose(taskName);
  const {
    clusterName,
    permissions: {users_permissions: currentPermissionList},
    tasks: {permissionEdit: state},
  } = useLoadedPermissions();

  const key = {clusterName, task: taskName};
  return {
    name: taskName,
    state,
    ...openClose,
    clusterName,
    dispatch,
    open: (payload: ActionPayload["CLUSTER.PERMISSIONS.EDIT"]) => {
      dispatch({
        type: "CLUSTER.PERMISSIONS.EDIT",
        key,
        payload,
      });
      openClose.open();
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
      openClose.close();
    },
  };
};
