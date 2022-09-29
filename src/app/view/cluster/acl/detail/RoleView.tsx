import { selectors } from "app/store";
import {
  DataListWithMenu,
  DetailViewSection,
  useClusterSelector,
  useSelectedClusterName,
} from "app/view/share";

import { AclType } from "../types";

import { Layout } from "./Layout";
import { RoleViewToolbar } from "./RoleViewToolbar";
import { getAssignedSubjectIdList } from "./tools";

export const RoleView = ({
  roleId,
  role,
}: {
  roleId: string;
  role: AclType<"role">;
}) => {
  const clusterName = useSelectedClusterName();
  const [{ acls }] = useClusterSelector(selectors.getCluster);

  return (
    <Layout
      aclType="role"
      aclId={roleId}
      toolbar={<RoleViewToolbar roleId={roleId} />}
    >
      <DetailViewSection caption="Description">
        <p>{role.description}</p>
      </DetailViewSection>

      <DetailViewSection caption="Permissions">
        <DataListWithMenu
          name="permission"
          emptyTitle={`No permission assigned to role "${roleId}".`}
          itemList={role.permissions}
          menuItems={[
            permission => ({
              name: "remove",
              confirm: {
                title: "Remove permission?",
                description: `This removes the permission ${permission}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `remove permission "${permission}"`,
                    call: {
                      name: "acl-remove-permission",
                      payload: { permission_id: permission },
                    },
                  },
                },
              },
            }),
          ]}
        />
      </DetailViewSection>

      <DetailViewSection caption="Users assigned">
        <DataListWithMenu
          name="user"
          emptyTitle={`No user assigned to role "${roleId}".`}
          itemList={getAssignedSubjectIdList(acls.user, roleId)}
          menuItems={[
            userId => ({
              name: "unassign-user",
              confirm: {
                title: "Unassign user?",
                description: `This unassigns the user ${userId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `unassign user "${userId}"`,
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

      <DetailViewSection caption="Groups assigned">
        <DataListWithMenu
          name="group"
          emptyTitle={`No group assigned to role "${roleId}".`}
          itemList={getAssignedSubjectIdList(acls.group, roleId)}
          menuItems={[
            groupId => ({
              name: "unassign-group",
              confirm: {
                title: "Unassign group?",
                description: `This unassigns the group ${groupId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `unassign group "${groupId}"`,
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
