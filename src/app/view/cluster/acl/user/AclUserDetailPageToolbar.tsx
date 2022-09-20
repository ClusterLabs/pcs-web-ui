import { DetailToolbar, useSelectedClusterName } from "app/view/share";

import * as assignRoleTask from "./task/assignRole";

export const AclUserDetailPageToolbar = ({ userId }: { userId: string }) => {
  const clusterName = useSelectedClusterName();

  return (
    <DetailToolbar
      toolbarName="user"
      buttonsItems={[
        {
          name: "assign-role",
          task: {
            component: assignRoleTask.Task,
            useTask: assignRoleTask.useTask,
          },
        },
        {
          name: "delete-user",
          confirm: {
            title: "Delete user?",
            description: `This deletes the user ${userId}`,
            action: {
              type: "LIB.CALL.CLUSTER",
              key: { clusterName },
              payload: {
                taskLabel: `delete user "${userId}"`,
                call: {
                  name: "acl-remove-target",
                  payload: { target_id: userId },
                },
              },
            },
          },
        },
      ]}
    />
  );
};
