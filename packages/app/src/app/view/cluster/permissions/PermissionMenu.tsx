import {testMarks} from "app/view/dataTest";
import {LauncherDropdown, TaskOpenArgs} from "app/view/share";

import {useLoadedPermissions} from "./LoadedPermissionsContext";
import * as task from "./task";
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

  const addOpenArgs: TaskOpenArgs<typeof task.add.useTask> = [
    {type: "update", permission},
  ];
  return (
    <LauncherDropdown
      items={[
        {
          name: "edit",
          task: {
            component: task.add.PermissionTask,
            useTask: task.add.useTask,
            openArgs: addOpenArgs,
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