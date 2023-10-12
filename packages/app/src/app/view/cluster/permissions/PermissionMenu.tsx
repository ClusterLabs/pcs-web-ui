import {testMarks} from "app/view/dataTest";
import {LauncherDropdown} from "app/view/share";

import {useLoadedPermissions} from "./LoadedPermissionsContext";
import {Permission} from "./types";

const {actions} = testMarks.cluster.permissions.permission;

export const PermissionMenu = ({
  permission,
  permissionList,
}: {
  permission: Permission;
  permissionList: Permission[];
}) => {
  const {clusterName} = useLoadedPermissions();

  return (
    <LauncherDropdown
      items={[
        {
          name: "edit",
          taskName: "permissionEdit",
          taskInitAction: {
            type: "CLUSTER.PERMISSIONS.EDIT",
            key: {clusterName, task: "permissionEdit"},
            payload: {type: "update", permission},
          },
          ...actions.edit.mark,
        },
        {
          name: "remove",
          confirm: {
            title: `Remove the permission "${permission.name}"?`,
            description: "Removes the permission.",
            action: {
              type: "CLUSTER.PERMISSIONS.SAVE",
              key: {clusterName, task: "permissionRemove"},
              payload: {
                permissionList: permissionList.filter(
                  p => p.name !== permission.name || p.type !== permission.type,
                ),
              },
            },
          },
          ...actions.remove.mark,
        },
      ]}
      {...actions.mark}
    />
  );
};
