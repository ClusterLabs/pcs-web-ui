import { LauncherDropdown } from "app/view/share";

import * as task from "./task";
import { Permission } from "./types";
import { usePermissions } from "./usePermissions";

export const PermissionMenu = ({ permission }: { permission: Permission }) => {
  const { clusterName, permissionList } = usePermissions();

  return (
    <LauncherDropdown
      dropdownName="permission"
      items={[
        {
          name: "edit",
          task: {
            component: task.add.PermissionTask,
            useTask: task.add.useTask,
            openArgs: [{ type: "update", permission }],
          },
        },
        {
          name: "remove",
          confirm: {
            title: `Remove the permission "${permission.name}"?`,
            description: "Removes the permission.",
            action: {
              type: "CLUSTER.PERMISSIONS.SAVE",
              key: { clusterName, task: "permissionRemove" },
              payload: {
                permissionList: permissionList.filter(
                  p => p.name !== permission.name || p.type !== permission.type,
                ),
              },
            },
          },
        },
      ]}
    />
  );
};
