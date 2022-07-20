import React from "react";
import { StackItem } from "@patternfly/react-core";

import { EmptyStateNoItem } from "app/view/share";
import { DetailLayout, useSelectedClusterName } from "app/view/share";

export const AclDoesNotExist: React.FC<{
  aclType: string;
  aclName: string;
}> = ({ aclType, aclName }) => {
  const clusterName = useSelectedClusterName();

  return (
    <DetailLayout caption={<strong>{aclName}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Acl ${aclType} "${aclName}" does not exist.`}
          message={
            `Acl ${aclType} "${aclName}"`
            + ` does not exist in cluster ${clusterName}.`
          }
        />
      </StackItem>
    </DetailLayout>
  );
};
