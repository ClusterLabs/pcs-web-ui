import { useSelectedClusterName } from "app/view/share";
import { DetailToolbar } from "app/view/share";

import * as addPermissionTask from "./task/addPermission";
import * as assignUserTask from "./task/assignUser";
import * as assignGroupTask from "./task/assignGroup";

export const AclRoleDetailPageToolbar = ({
  roleName,
}: {
  roleName: string;
}) => {
  const clusterName = useSelectedClusterName();

  return (
    <DetailToolbar
      toolbarName="acl-role"
      buttonsItems={[
        {
          name: "assign-user",
          task: {
            component: assignUserTask.Task,
            useTask: assignUserTask.useTask,
          },
        },
        {
          name: "add-permission",
          task: {
            component: addPermissionTask.Task,
            useTask: addPermissionTask.useTask,
          },
        },
      ]}
      dropdownItems={[
        {
          name: "assign-group",
          task: {
            component: assignGroupTask.Task,
            useTask: assignGroupTask.useTask,
          },
        },
        {
          name: "delete-role",
          confirm: {
            title: "Delete role?",
            description: "This deletes the role",
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
          },
        },
      ]}
    />
  );
};
