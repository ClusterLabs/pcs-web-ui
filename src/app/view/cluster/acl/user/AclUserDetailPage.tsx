import {
  Divider,
  List,
  ListItem,
  StackItem,
  TextContent,
  Title,
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

export const AclUserDetailPage = () => {
  const { selectedItemUrlName: aclName } = useGroupDetailViewContext();
  const [user] = useClusterSelector(selectors.getSelectedAcl, aclName, "user");

  if (!user) {
    return (
      <>
        <Divider />
        <AclDoesNotExist aclType="user" aclName={aclName} />
      </>
    );
  } else {
    return (
      <DetailLayout caption={aclName} toolbar={<AclDetailPageToolbar />}>
        <>
          <Divider />
          <StackItem>
            <TextContent>
              <Title headingLevel={"h1"}>Roles assigned</Title>

              {user[1].length === 0 ? (
                <EmptyStateNoItem canAdd={false}
                  title={`No role assigned to user "${aclName}".`}
                />
              ) : (
                <List isPlain isBordered>
                  {user[1].map((role: string) => (
                    <ListItem key={role}>{role}</ListItem>
                  ))}
                </List>
              )}
            </TextContent>
          </StackItem>
        </>
      </DetailLayout>
    );
  }
};
