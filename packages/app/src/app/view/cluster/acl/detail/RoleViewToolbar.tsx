import {testMarks} from "app/view/dataTest";
import {DetailToolbar, LauncherDropdown, TaskOpenArgs} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import * as task from "./task";

type AssignSubjectOpenArgs = TaskOpenArgs<
  typeof task.assignSubjectToRole.useTask
>;

const {toolbar} = testMarks.cluster.acl.currentRole;

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
          ...toolbar.assignUser.mark,
        },
        {
          name: "add-permissions",
          task: {
            component: task.addPermissionToRole.Task,
            useTask: task.addPermissionToRole.useTask,
          },
          ...toolbar.addPermissions.mark,
        },
      ]}
      dropdown={
        <LauncherDropdown
          items={[
            {
              name: "assign-group",
              task: {
                component: task.assignSubjectToRole.Task,
                useTask: task.assignSubjectToRole.useTask,
                openArgs: assignGroupOpenArgs,
              },
              ...toolbar.assignGroup.mark,
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
                runMark: toolbar.deleteRole.confirm.run.mark,
                cancelMark: toolbar.deleteRole.confirm.cancel.mark,
                ...toolbar.deleteRole.confirm.mark,
              },
              ...toolbar.deleteRole.mark,
            },
          ]}
        />
      }
      {...toolbar.mark}
    />
  );
};
