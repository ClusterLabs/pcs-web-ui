import { DataList } from "@patternfly/react-core";

import { Acl } from "app/view/cluster/types";
import { EmptyStateNoItem } from "app/view/share";

import { AclRoleListItem } from "./list/AclRoleListItem";

export const AclRoleList = ({ aclRoleList }: { aclRoleList: Acl["role"] }) => {
  if (aclRoleList === undefined) {
    return (
      <EmptyStateNoItem
        title="No acl role is configured."
        message="You don't have any configured acl roles here."
      />
    );
  }

  return (
    <DataList aria-label="Cluster role acls">
      {Object.entries(aclRoleList).map(
        ([roleName, { description, permissions }]) => (
          <AclRoleListItem
            key={roleName}
            name={roleName}
            description={description}
            permissions={permissions}
          />
        ),
      )}
    </DataList>
  );
};
