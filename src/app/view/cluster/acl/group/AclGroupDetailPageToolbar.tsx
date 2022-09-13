import {
  DetailToolbar,
  LauncherItem as ToolbarItem,
  useSelectedClusterName,
} from "app/view/share";

import * as assignRoleTask from "./task/assignRole";

export const AclGroupDetailPageToolbar = ({
  groupName,
}: {
  groupName: string;
}) => {
  const clusterName = useSelectedClusterName();

  const assignRole: ToolbarItem = {
    name: "assign-role",
    task: {
      component: assignRoleTask.Task,
      useTask: assignRoleTask.useTask,
    },
  };

  const deleteGroup: ToolbarItem = {
    name: "delete-group",
    confirm: {
      title: "Delete group?",
      description: <>This deletes the group {groupName}</>,
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `delete group "${groupName}"`,
          call: {
            name: "acl-remove-group",
            payload: { group_id: groupName },
          },
        },
      },
    },
  };

  return (
    <DetailToolbar
      toolbarName="group"
      buttonsItems={[assignRole, deleteGroup]}
    />
  );
};
