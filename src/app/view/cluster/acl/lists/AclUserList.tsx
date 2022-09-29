import { DataList } from "@patternfly/react-core";

import { Acl } from "app/view/cluster/types";
import { EmptyStateNoItem } from "app/view/share";

import { AclSubjectListItem } from "./AclSubjectListItem";

export const AclUserList = ({ aclUserList }: { aclUserList: Acl["user"] }) => {
  if (aclUserList === undefined) {
    return (
      <EmptyStateNoItem
        title="No acl user is configured."
        message="You don't have any configured acl users here."
      />
    );
  }

  return (
    <DataList aria-label="Cluster user acls">
      {Object.entries(aclUserList).map(([userName, roleIdList]) => (
        <AclSubjectListItem
          key={userName}
          aclType="user"
          id={userName}
          roleIdList={roleIdList}
        />
      ))}
    </DataList>
  );
};
