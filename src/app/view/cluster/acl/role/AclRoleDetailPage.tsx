import { DataList, Divider } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  DetailLayout,
  DetailViewSection,
  EmptyStateNoItem,
  useClusterSelector,
  useGroupDetailViewContext,
} from "app/view/share";

import { AclDoesNotExist } from "../AclDoesNotExist";
import { AclDetailCaption } from "../AclDetailCaption";

import { AclRoleDetailPageToolbar } from "./AclRoleDetailPageToolbar";
import { AclRoleDetailPermissionListItem } from "./AclRoleDetailPermissionListItem";
import { AclRoleDetailListItem } from "./AclRoleDetailListItem";

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
        {role.permissions.length > 0 ? (
          <DataList aria-label="Permission list">
            {role.permissions.map((permission: string, i: number) => (
              <AclRoleDetailPermissionListItem
                key={i}
                permission={permission}
              />
            ))}
          </DataList>
        ) : (
          <EmptyStateNoItem
            canAdd={false}
            title={`No permission assigned to role "${roleId}".`}
          />
        )}
      </DetailViewSection>

      <DetailViewSection caption="Users assigned">
        {userIdList.length > 0 ? (
          <DataList aria-label="User list">
            {userIdList.map(userId => (
              <AclRoleDetailListItem
                key={userId}
                aclName={userId}
                aclType="user"
              />
            ))}
          </DataList>
        ) : (
          <EmptyStateNoItem
            canAdd={false}
            title={`No user assigned to role "${roleId}".`}
          />
        )}
      </DetailViewSection>

      <DetailViewSection caption="Groups assigned">
        {groupIdList.length > 0 ? (
          <DataList aria-label="Group list">
            {groupIdList.map(groupId => (
              <AclRoleDetailListItem
                key={groupId}
                aclName={groupId}
                aclType="group"
              />
            ))}
          </DataList>
        ) : (
          <EmptyStateNoItem
            canAdd={false}
            title={`No group assigned to role "${roleId}".`}
          />
        )}
      </DetailViewSection>
    </DetailLayout>
  );
};
