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

export const GroupView = ({
  groupId,
  roleIdList,
}: {
  groupId: string;
  roleIdList: AclType<"group">;
}) => {
  const clusterName = useSelectedClusterName();
  const assignRoleOpenArgs: AssignRoleOpenArgs = [
    { subjectType: "group", subjectId: groupId },
  ];

  return (
    <Layout
      aclType="group"
      aclId={groupId}
      toolbar={
        <DetailToolbar
          toolbarName="group"
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
              name: "delete-group",
              confirm: {
                title: "Delete group?",
                description: `This deletes the group ${groupId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `delete group "${groupId}"`,
                    call: {
                      name: "acl-remove-group",
                      payload: { group_id: groupId },
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
          emptyTitle={`No role assigned to group "${groupId}".`}
          itemList={roleIdList}
          menuItems={[
            roleId => ({
              name: "unassign",
              confirm: {
                title: "Unassign role?",
                description: `This unassigns the role ${roleId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `unassign role "${roleId}"`,
                    call: {
                      name: "acl-unassign-role-from-group",
                      payload: { role_id: roleId, group_id: groupId },
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
