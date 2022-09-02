import {
  DataList,
  Divider,
  StackItem,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  DetailLayout,
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

const getAssigningElements = (
  elements: Acls["user"] | Acls["group"],
  roleId: string,
) => {
  return Object.entries(elements || {})
    .filter(([_id, roleIdList]) => roleIdList.includes(roleId))
    .map(([id, _roleIdList]) => id);
};

export const AclRoleDetailPage = () => {
  const [{ acls }] = useClusterSelector(selectors.getCluster);
  const { selectedItemUrlName: roleId } = useGroupDetailViewContext();
  const role = acls.role?.[roleId];

  if (!role) {
    return (
      <>
        <Divider />
        <AclDoesNotExist aclType="role" aclName={roleId} />
      </>
    );
  }

  const userIdList = getAssigningElements(acls.user, roleId);
  const groupIdList = getAssigningElements(acls.group, roleId);

  return (
    <DetailLayout
      caption={<AclDetailCaption aclName={roleId} type={"Role"} />}
      toolbar={<AclRoleDetailPageToolbar roleName={roleId} />}
    >
      <>
        <Divider />
        <StackItem>
          <TextContent>
            <Text component="h1">Description</Text>
            <Text component={TextVariants.p}>{role.description}</Text>
          </TextContent>
        </StackItem>

        <StackItem>
          <TextContent>
            <Text component="h1">Permissions</Text>
          </TextContent>

          {role.permissions.length === 0 ? (
            <EmptyStateNoItem
              canAdd={false}
              title={`No permission assigned to role "${roleId}".`}
            />
          ) : (
            <DataList aria-label="Permission list">
              {role.permissions.map((permission: string, i: number) => (
                <AclRoleDetailPermissionListItem
                  key={i}
                  permission={permission}
                />
              ))}
            </DataList>
          )}
        </StackItem>

        <StackItem>
          <TextContent>
            <Text component="h1">Users assigned</Text>
          </TextContent>

          {userIdList.length === 0 ? (
            <EmptyStateNoItem
              canAdd={false}
              title={`No user assigned to role "${roleId}".`}
            />
          ) : (
            <DataList aria-label="User list">
              {userIdList.map(userId => (
                <AclRoleDetailListItem
                  key={userId}
                  aclName={userId}
                  aclType="user"
                />
              ))}
            </DataList>
          )}
        </StackItem>

        <StackItem>
          <TextContent>
            <Text component="h1">Groups assigned</Text>
          </TextContent>

          {groupIdList.length === 0 ? (
            <EmptyStateNoItem
              canAdd={false}
              title={`No group assigned to role "${roleId}".`}
            />
          ) : (
            <DataList aria-label="Group list">
              {groupIdList.map(groupId => (
                <AclRoleDetailListItem
                  key={groupId}
                  aclName={groupId}
                  aclType="group"
                />
              ))}
            </DataList>
          )}
        </StackItem>
      </>
    </DetailLayout>
  );
};
