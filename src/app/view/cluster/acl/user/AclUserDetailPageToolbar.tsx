import {
  DetailToolbar,
  LauncherItem as ToolbarItem,
  useSelectedClusterName,
} from "app/view/share";

import * as assignRoleTask from "./task/assignRole";

export const AclUserDetailPageToolbar = ({
  userName,
}: {
  userName: string;
}) => {
  const clusterName = useSelectedClusterName();

  const assignRole: ToolbarItem = {
    name: "assign-role",
    task: {
      component: assignRoleTask.Task,
      useTask: assignRoleTask.useTask,
    },
  };

  const deleteUser: ToolbarItem = {
    name: "delete-user",
    confirm: {
      title: "Delete user?",
      description: <>This deletes the user {userName}</>,
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `delete user "${userName}"`,
          call: {
            name: "acl-remove-target",
            payload: { target_id: userName },
          },
        },
      },
    },
  };

  return (
    <DetailToolbar toolbarName="user" buttonsItems={[assignRole, deleteUser]} />
  );
};
