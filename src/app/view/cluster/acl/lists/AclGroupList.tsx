import { DataList } from "@patternfly/react-core";

import { Acl } from "app/view/cluster/types";
import { EmptyStateNoItem } from "app/view/share";

import { AclSubjectListItem } from "./AclSubjectListItem";

export const AclGroupList = ({
  aclGroupList,
}: {
  aclGroupList: Acl["group"];
}) => {
  if (aclGroupList === undefined) {
    return (
      <EmptyStateNoItem
        title="No acl group is configured."
        message="You don't have any configured acl groups here."
      />
    );
  }

  return (
    <DataList aria-label="Cluster group acls">
      {Object.entries(aclGroupList).map(([groupName, roleIdList]) => (
        <AclSubjectListItem
          key={groupName}
          aclType="group"
          id={groupName}
          roleIdList={roleIdList}
        />
      ))}
    </DataList>
  );
};
