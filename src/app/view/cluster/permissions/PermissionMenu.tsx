import {
  LauncherDropdown,
  TaskOpenArgs,
  useSelectedClusterName,
} from "app/view/share";

import * as task from "./task";
import {Permission} from "./types";

export const PermissionMenu = ({
  permission,
  permissionList,
}: {
  permission: Permission;
  permissionList: Permission[];
}) => {
  const clusterName = useSelectedClusterName();

  const addOpenArgs: TaskOpenArgs<typeof task.add.useTask> = [
    {type: "update", permission},
  ];
  return (
    <LauncherDropdown
      dropdownName="permission"
      items={[
        {
          name: "edit",
          task: {
            component: task.add.PermissionTask,
            useTask: task.add.useTask,
            openArgs: addOpenArgs,
          },
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
        },
      ]}
    />
  );
};
