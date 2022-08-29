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

import { AclGroupDetailPageToolbar } from "./AclGroupDetailPageToolbar";
import { AclGroupDetailListItem } from "./AclGroupDetailListItem";

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
      <DetailLayout
        caption={<AclDetailCaption aclName={aclName} type={"Group"} />}
        toolbar={<AclGroupDetailPageToolbar groupName={aclName} />}
      >
        <>
          <Divider />
          <StackItem>
            <TextContent>
              <Title headingLevel={"h1"}>Roles assigned</Title>
            </TextContent>

            {group[1].length === 0 ? (
              <EmptyStateNoItem
                canAdd={false}
                title={`No role assigned to group "${aclName}".`}
              />
            ) : (
              <DataList aria-label="Role list">
                {group[1].map((role: string, i: number) => (
                  <AclGroupDetailListItem key={i} roleName={role} />
                ))}
              </DataList>
            )}
          </StackItem>
        </>
      </DetailLayout>
    );
  }
};
