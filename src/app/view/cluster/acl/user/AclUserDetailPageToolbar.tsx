import {
  ActionTaskLauncher,
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view/share";

import * as assignRoleTask from "./task/assignRole";

export const AclUserDetailPageToolbar = ({
  userName,
}: {
  userName: string;
}) => {
  const clusterName = useSelectedClusterName();

  const assignRole = (
    <ActionTaskLauncher
      taskComponent={assignRoleTask.Task}
      useTask={assignRoleTask.useTask}
      label="Assign role"
      variant="secondary"
    />
  );

  const deleteUser: DetailLayoutToolbarAction = {
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
    confirm: {
      title: "Delete user?",
      description: <>This deletes the user {userName}</>,
    },
  };

  return (
    <DetailLayoutToolbar
      toolbarName="user"
      buttonActions={{
        "Assign role": assignRole,
        "Delete user": deleteUser,
      }}
    />
  );
};
