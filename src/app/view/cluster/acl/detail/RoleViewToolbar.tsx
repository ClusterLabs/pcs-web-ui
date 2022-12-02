import {DetailToolbar, TaskOpenArgs, useLoadedCluster} from "app/view/share";

import * as task from "./task";

type AssignSubjectOpenArgs = TaskOpenArgs<
  typeof task.assignSubjectToRole.useTask
>;

export const RoleViewToolbar = ({roleId}: {roleId: string}) => {
  const {clusterName} = useLoadedCluster();

  const assignUserOpenArgs: AssignSubjectOpenArgs = [
    {subjectType: "user", roleId},
  ];
  const assignGroupOpenArgs: AssignSubjectOpenArgs = [
    {subjectType: "group", roleId},
  ];
  return (
    <DetailToolbar
      toolbarName="acl-role"
      buttonsItems={[
        {
          name: "assign-user",
          task: {
            component: task.assignSubjectToRole.Task,
            useTask: task.assignSubjectToRole.useTask,
            openArgs: assignUserOpenArgs,
          },
        },
        {
          name: "add-permissions",
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
            component: task.assignSubjectToRole.Task,
            useTask: task.assignSubjectToRole.useTask,
            openArgs: assignGroupOpenArgs,
          },
        },
        {
          name: "delete-role",
          confirm: {
            title: "Delete role?",
            description: "This deletes the role",
            action: {
              type: "LIB.CALL.CLUSTER",
              key: {clusterName},
              payload: {
                taskLabel: `delete role "${roleId}"`,
                call: {
                  name: "acl-remove-role",
                  payload: {role_id: roleId},
                },
              },
            },
          },
        },
      ]}
    />
  );
};
