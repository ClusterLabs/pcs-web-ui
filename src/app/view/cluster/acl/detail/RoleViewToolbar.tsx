import { useSelectedClusterName } from "app/view/share";
import { DetailToolbar } from "app/view/share";

import * as task from "./task";

export const RoleViewToolbar = ({ roleName }: { roleName: string }) => {
  const clusterName = useSelectedClusterName();

  return (
    <DetailToolbar
      toolbarName="acl-role"
      buttonsItems={[
        {
          name: "assign-user",
          task: {
            component: task.assignUserToRole.Task,
            useTask: task.assignUserToRole.useTask,
          },
        },
        {
          name: "add-permission",
          task: {
            component: task.addPermissionToRole.Task,
            useTask: task.addPermissionToRole.useTask,
          },
        },
      ]}
      dropdownItems={[
        {
          name: "assign-group",
          task: {
            component: task.assignGroupToRole.Task,
            useTask: task.assignGroupToRole.useTask,
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
