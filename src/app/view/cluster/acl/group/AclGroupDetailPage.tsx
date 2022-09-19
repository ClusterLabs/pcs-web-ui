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

import { AclGroupDetailPageToolbar } from "./AclGroupDetailPageToolbar";
import { AclGroupDetailListItem } from "./AclGroupDetailListItem";

export const AclGroupDetailPage = () => {
  const { selectedItemUrlName: groupId } = useGroupDetailViewContext();
  const [{ acls }] = useClusterSelector(selectors.getCluster);
  const roleIdList = acls.group?.[groupId];

  if (!roleIdList) {
    return <AclDoesNotExist aclType="group" aclName={groupId} />;
  }

  return (
    <DetailLayout
      caption={<AclDetailCaption aclName={groupId} type={"Group"} />}
      toolbar={<AclGroupDetailPageToolbar groupName={groupId} />}
    >
      <Divider />
      <DetailViewSection caption="Roles assigned">
        {roleIdList.length === 0 ? (
          <EmptyStateNoItem
            canAdd={false}
            title={`No role assigned to group "${groupId}".`}
          />
        ) : (
          <DataList aria-label="Role list">
            {roleIdList.map((roleId: string, i: number) => (
              <AclGroupDetailListItem key={i} roleName={roleId} />
            ))}
          </DataList>
        )}
      </DetailViewSection>
    </DetailLayout>
  );
};
