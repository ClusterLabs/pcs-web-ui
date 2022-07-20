import {
  Divider,
  List,
  ListItem,
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
import { AclDetailPageToolbar } from "../AclDetailPageToolbar";

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
      <DetailLayout caption={aclName} toolbar={<AclDetailPageToolbar />}>
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

              {role[1].permissions.length === 0 ? (
                <EmptyStateNoItem
                  canAdd={false}
                  title={`No permission assigned to role "${aclName}".`}
                />
              ) : (
                <List isPlain isBordered>
                  {role[1].permissions.map((permission: string) => (
                    <ListItem key={permission}>{permission}</ListItem>
                  ))}
                </List>
              )}
            </TextContent>
          </StackItem>

          <StackItem>
            <TextContent>
              <Text component="h1">Users assigned</Text>

              {users === undefined || listOfAssignedAcls(users).length === 0 ? (
                <EmptyStateNoItem
                  canAdd={false}
                  title={`No user assigned to role "${aclName}".`}
                />
              ) : (
                <List isPlain isBordered>
                  {listOfAssignedAcls(users).map((user) => {
                    return <ListItem key={user[0]}>{user[0]}</ListItem>;
                  })}
                </List>
              )}
            </TextContent>
          </StackItem>

          <StackItem>
            <TextContent>
              <Text component="h1">Groups assigned</Text>

              {groups === undefined
              || listOfAssignedAcls(groups).length === 0 ? (
                <EmptyStateNoItem
                  canAdd={false}
                  title={`No group assigned to role "${aclName}".`}
                />
              ) : (
                <List isPlain isBordered>
                  {listOfAssignedAcls(groups).map((group) => {
                    return <ListItem key={group[0]}>{group[0]}</ListItem>;
                  })}
                </List>
              )}
            </TextContent>
          </StackItem>
        </>
      </DetailLayout>
    );
  }
};
