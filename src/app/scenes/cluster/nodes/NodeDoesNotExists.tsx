import React from "react";
import { StackItem } from "@patternfly/react-core";

import { EmptyStateNoItem } from "app/view";
import { DetailLayout, useSelectedClusterName } from "app/view";

export const NodeDoesNotExists = ({ nodeUrlName }: { nodeUrlName: string }) => {
  const clusterName = useSelectedClusterName();
  return (
    <DetailLayout caption={<strong>{nodeUrlName}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Node "${nodeUrlName}" does not exist.`}
          message={`Node "${nodeUrlName}" is not a member of cluster ${clusterName}.`}
        />
      </StackItem>
    </DetailLayout>
  );
};
