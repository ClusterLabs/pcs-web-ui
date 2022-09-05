import {
  ActionTaskLauncher,
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view/share";

import * as addPermissionTask from "./task/addPermission";
import * as assignUserTask from "./task/assignUser";
import * as assignGroupTask from "./task/assignGroup";

export const AclRoleDetailPageToolbar = ({
  roleName,
}: {
  roleName: string;
}) => {
  const clusterName = useSelectedClusterName();

  const assignGroup = (
    <ActionTaskLauncher
      taskComponent={assignGroupTask.Task}
      useTask={assignGroupTask.useTask}
      label="Assign group"
      variant="secondary"
    />
  );

  const assignUser = (
    <ActionTaskLauncher
      taskComponent={assignUserTask.Task}
      useTask={assignUserTask.useTask}
      label="Assign user"
      variant="secondary"
    />
  );

  const addPermission = (
    <ActionTaskLauncher
      taskComponent={addPermissionTask.Task}
      useTask={addPermissionTask.useTask}
      label="Add permission"
      variant="secondary"
    />
  );

  const deleteRole: DetailLayoutToolbarAction = {
    action: {
      type: "LIB.CALL.CLUSTER",
      key: { clusterName },
      payload: {
        taskLabel: `delete role "${roleName}"`,
        call: {
          name: "acl-remove-role",
          payload: { role_id: roleName },
        },
      },
    },
    confirm: {
      title: "Delete role?",
      description: <>This deletes the role</>,
    },
  };

  return (
    <DetailLayoutToolbar
      toolbarName="role"
      buttonActions={{
        assignUser,
        addPermission,
        assignGroup,
      }}
      dropdownActions={{
        "Delete role": deleteRole,
      }}
    />
  );
};
