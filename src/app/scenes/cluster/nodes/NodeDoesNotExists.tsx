import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { DetailLayout } from "app/view";
import { useSelectedClusterName } from "app/scenes/cluster";

export const NodeDoesNotExists = ({ nodeUrlName }: { nodeUrlName: string }) => {
  const clusterUrlName = useSelectedClusterName();
  return (
    <DetailLayout caption={<strong>{nodeUrlName}</strong>}>
      <StackItem>
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon icon={PlusCircleIcon} />
          <Title size="lg" headingLevel="h3">
            {`Node "${nodeUrlName}" does not exist.`}
          </Title>
          <EmptyStateBody>
            {`Node "${nodeUrlName}"`
              + ` is not a member of cluster ${clusterUrlName}.`}
          </EmptyStateBody>
        </EmptyState>
      </StackItem>
    </DetailLayout>
  );
};
