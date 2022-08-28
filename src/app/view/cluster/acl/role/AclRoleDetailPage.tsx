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

export const AclRoleDetailPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  const { selectedItemUrlName: aclName } = useGroupDetailViewContext();
  const [role] = useClusterSelector(selectors.getSelectedAcl, aclName, "role");

  const users = cluster.acls.user;
  const groups = cluster.acls.group;

  const listOfAssignedAcls = (acls: Record<string, string[]>) => {
    if (role) {
      return Object.entries(acls).filter(acl => acl[1].includes(role[0]));
    }
    return [];
  };

  if (!role) {
    return (
      <>
        <Divider />
        <AclDoesNotExist aclType="role" aclName={aclName} />
      </>
    );
  } else {
    return (
      <DetailLayout
        caption={<AclDetailCaption aclName={aclName} type={"Role"} />}
        toolbar={<AclRoleDetailPageToolbar roleName={aclName} />}
      >
        <>
          <Divider />
          <StackItem>
            <TextContent>
              <Text component="h1">Description</Text>
              <Text component={TextVariants.p}>{role?.[1].description}</Text>
            </TextContent>
          </StackItem>

          <StackItem>
            <TextContent>
              <Text component="h1">Permissions</Text>
            </TextContent>

            {role[1].permissions.length === 0 ? (
              <EmptyStateNoItem
                canAdd={false}
                title={`No permission assigned to role "${aclName}".`}
              />
            ) : (
              <DataList aria-label="Permission list">
                {role[1].permissions.map((permission: string, i: number) => (
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

            {users === undefined || listOfAssignedAcls(users).length === 0 ? (
              <EmptyStateNoItem
                canAdd={false}
                title={`No user assigned to role "${aclName}".`}
              />
            ) : (
              <DataList aria-label="User list">
                {listOfAssignedAcls(users).map((user, i) => (
                  <AclRoleDetailListItem
                    key={i}
                    aclName={user[0]}
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

            {groups === undefined || listOfAssignedAcls(groups).length === 0 ? (
              <EmptyStateNoItem
                canAdd={false}
                title={`No group assigned to role "${aclName}".`}
              />
            ) : (
              <DataList aria-label="Group list">
                {listOfAssignedAcls(groups).map((group, i) => (
                  <AclRoleDetailListItem
                    key={i}
                    aclName={group[0]}
                    aclType="group"
                  />
                ))}
              </DataList>
            )}
          </StackItem>
        </>
      </DetailLayout>
    );
  }
};
