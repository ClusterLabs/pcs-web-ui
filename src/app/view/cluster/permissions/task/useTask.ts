import { useSelector } from "react-redux";

import { ActionPayload, selectors } from "app/store";
import { useClusterTask } from "app/view/share";

const { getClusterPermissions } = selectors;

export const useTask = () => {
  const task = useClusterTask("permissionCreate");
  const { dispatch, clusterName, state } = task;
  const currentPermissions = useSelector(getClusterPermissions(clusterName));

  return {
    ...task,

    isNameValid: state.name.length > 0,
    updateState: (payload: ActionPayload["CLUSTER.PERMISSION.CREATE.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.PERMISSION.CREATE.UPDATE",
        key: { clusterName, task: task.name },
        payload,
      }),

    permissionCreate: () => {
      if (currentPermissions === null) {
        // it means current permissions are not loaded
        return;
      }
      dispatch({
        type: "CLUSTER.PERMISSIONS.SAVE",
        key: { clusterName, task: task.name },
        payload: {
          permissions: [
            ...currentPermissions.users_permissions,
            {
              name: state.name,
              type: state.type,
              allow: [
                ...(state.read ? ["read"] : []),
                ...(state.write ? ["write"] : []),
                ...(state.grant ? ["grant"] : []),
                ...(state.full ? ["full"] : []),
              ],
            },
          ],
        },
      });
    },

    recoverFromError: () => {
      //TODO
    },
  };
};
