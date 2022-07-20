import { DataList } from "@patternfly/react-core";

import { Acl } from "app/view/cluster/types";
import { EmptyStateNoItem } from "app/view/share";

import { AclRoleListItem } from "./AclRoleListItem";

export const AclRoleList = ({ aclRoleList }: { aclRoleList: Acl["role"] }) => {
  if (aclRoleList === undefined) {
    return (
      <EmptyStateNoItem
        title="No ACL role is configured."
        message="You don't have any configured ACL roles here."
      />
    );
  }

  return (
    <DataList aria-label="Cluster role ACLs">
      {Object.entries(aclRoleList).map(([roleName, { permissions }]) => (
        <AclRoleListItem
          key={roleName}
          name={roleName}
          permissions={permissions}
        />
      ))}
    </DataList>
  );
};
