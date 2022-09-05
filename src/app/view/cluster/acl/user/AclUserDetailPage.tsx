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
  const { selectedItemUrlName: userId } = useGroupDetailViewContext();
  const [{ acls }] = useClusterSelector(selectors.getCluster);
  const roleIdList = acls.user?.[userId];

  if (!roleIdList) {
    return <AclDoesNotExist aclType="user" aclName={userId} />;
  }

  return (
    <DetailLayout
      caption={<AclDetailCaption aclName={userId} type={"User"} />}
      toolbar={<AclUserDetailPageToolbar userName={userId} />}
    >
      <Divider />
      <StackItem>
        <TextContent>
          <Title headingLevel={"h1"}>Roles assigned</Title>
        </TextContent>

        {roleIdList.length === 0 ? (
          <EmptyStateNoItem
            canAdd={false}
            title={`No role assigned to user "${userId}".`}
          />
        ) : (
          <DataList aria-label="Role list">
            {roleIdList.map((roleId: string, i: number) => (
              <AclUserDetailListItem key={i} roleName={roleId} />
            ))}
          </DataList>
        )}
      </StackItem>
    </DetailLayout>
  );
};
