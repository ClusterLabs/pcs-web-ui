import {
  DataListWithMenu,
  DetailToolbar,
  DetailViewSection,
  TaskOpenArgs,
  useSelectedClusterName,
} from "app/view/share";

import { AclType } from "../types";

import { Layout } from "./Layout";
import * as task from "./task";

type AssignRoleOpenArgs = TaskOpenArgs<typeof task.assignSubjectToRole.useTask>;

export const UserView = ({
  userId,
  roleIdList,
}: {
  userId: string;
  roleIdList: AclType<"user">;
}) => {
  const clusterName = useSelectedClusterName();

  const assignRoleOpenArgs: AssignRoleOpenArgs = [
    { subjectType: "user", subjectId: userId },
  ];
  return (
    <Layout
      aclType="user"
      aclId={userId}
      toolbar={
        <DetailToolbar
          toolbarName="user"
          buttonsItems={[
            {
              name: "assign-role",
              task: {
                component: task.assignSubjectToRole.Task,
                useTask: task.assignSubjectToRole.useTask,
                openArgs: assignRoleOpenArgs,
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
      }
    >
      <DetailViewSection caption="Roles assigned">
        <DataListWithMenu
          name="role"
          emptyTitle={`No role assigned to user "${userId}".`}
          itemList={roleIdList}
          menuItems={[
            roleId => ({
              name: "unassign-user",
              confirm: {
                title: "Unassign role?",
                description: `This unassigns the role ${roleId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `unassign role "${roleId}"`,
                    call: {
                      name: "acl-unassign-role-from-target",
                      payload: { role_id: roleId, target_id: userId },
                    },
                  },
                },
              },
            }),
          ]}
        />
      </DetailViewSection>
    </Layout>
  );
};
