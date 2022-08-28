import {
  DataList,
  Divider,
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
import { AclDetailCaption } from "../AclDetailCaption";

import { AclUserDetailPageToolbar } from "./AclUserDetailPageToolbar";
import { AclUserDetailListItem } from "./AclUserDetailListItem";

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
      <DetailLayout
        caption={<AclDetailCaption aclName={aclName} type={"User"} />}
        toolbar={<AclUserDetailPageToolbar userName={aclName} />}
      >
        <>
          <Divider />
          <StackItem>
            <TextContent>
              <Title headingLevel={"h1"}>Roles assigned</Title>
            </TextContent>

            {user[1].length === 0 ? (
              <EmptyStateNoItem
                canAdd={false}
                title={`No role assigned to user "${aclName}".`}
              />
            ) : (
              <DataList aria-label="Role list">
                {user[1].map((role: string, i: number) => (
                  <AclUserDetailListItem key={i} roleName={role} />
                ))}
              </DataList>
            )}
          </StackItem>
        </>
      </DetailLayout>
    );
  }
};
