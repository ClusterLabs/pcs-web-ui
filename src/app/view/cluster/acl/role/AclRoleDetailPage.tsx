import { Divider } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  DataListWithMenu,
  DetailLayout,
  DetailViewSection,
  useClusterSelector,
  useGroupDetailViewContext,
  useSelectedClusterName,
} from "app/view/share";

import { AclDoesNotExist } from "../AclDoesNotExist";
import { AclDetailCaption } from "../AclDetailCaption";

import { AclRoleDetailPageToolbar } from "./AclRoleDetailPageToolbar";

type Acls = ReturnType<ReturnType<typeof selectors.getCluster>>["acls"];

const getAssignedSubjectIdList = (
  subjectMap: Acls["user"] | Acls["group"],
  roleId: string,
) => {
  return Object.entries(subjectMap || {})
    .filter(([_id, roleIdList]) => roleIdList.includes(roleId))
    .map(([id, _roleIdList]) => id);
};

export const AclRoleDetailPage = () => {
  const clusterName = useSelectedClusterName();
  const [{ acls }] = useClusterSelector(selectors.getCluster);
  const { selectedItemUrlName: roleId } = useGroupDetailViewContext();
  const role = acls.role?.[roleId];

  if (!role) {
    return <AclDoesNotExist aclType="role" aclName={roleId} />;
  }

  const userIdList = getAssignedSubjectIdList(acls.user, roleId);
  const groupIdList = getAssignedSubjectIdList(acls.group, roleId);

  return (
    <DetailLayout
      caption={<AclDetailCaption aclName={roleId} type={"Role"} />}
      toolbar={<AclRoleDetailPageToolbar roleName={roleId} />}
    >
      <Divider />
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
          itemList={userIdList}
          menuItems={[
            userId => ({
              name: "unassign-user",
              confirm: {
                title: "Unassign user?",
                description: <>This unassigns the user {userId}</>,
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
          itemList={groupIdList}
          menuItems={[
            groupId => ({
              name: "unassign-group",
              confirm: {
                title: "Unassign group?",
                description: <>This unassigns the group {groupId}</>,
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
    </DetailLayout>
  );
};
