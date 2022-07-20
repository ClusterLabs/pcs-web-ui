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

export const AclGroupDetailPage = () => {
  const { selectedItemUrlName: aclName } = useGroupDetailViewContext();
  const [group] = useClusterSelector(
    selectors.getSelectedAcl,
    aclName,
    "group",
  );

  if (!group) {
    return (
      <>
        <Divider />
        <AclDoesNotExist aclType="group" aclName={aclName} />
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

              {group[1].length === 0 ? (
                <EmptyStateNoItem canAdd={false}
                  title={`No role assigned to group "${aclName}".`}
                />
              ) : (
                <List isPlain isBordered>
                  {group[1].map((role: string) => (
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
