import {
  DataListWithMenu,
  DetailToolbar,
  DetailViewSection,
  useSelectedClusterName,
} from "app/view/share";

import { AclType } from "../types";

import { Layout } from "./Layout";
import { assignRoleToGroup } from "./task";

export const GroupView = ({
  groupId,
  roleIdList,
}: {
  groupId: string;
  roleIdList: AclType<"group">;
}) => {
  const clusterName = useSelectedClusterName();

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
                component: assignRoleToGroup.Task,
                useTask: assignRoleToGroup.useTask,
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
              name: "unassign-group",
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
