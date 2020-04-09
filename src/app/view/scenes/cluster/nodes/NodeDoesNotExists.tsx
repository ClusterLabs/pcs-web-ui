import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { DetailLayout } from "app/view/common";
import { useSelectedCluster } from "app/view/scenes/cluster";

export const NodeDoesNotExists = ({ nodeUrlName }: { nodeUrlName: string }) => {
  const clusterUrlName = useSelectedCluster();
  return (
    <DetailLayout caption={<strong>{nodeUrlName}</strong>}>
      <StackItem>
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon icon={PlusCircleIcon} />
          <Title size="lg">{`Node "${nodeUrlName}" does not exist.`}</Title>
          <EmptyStateBody>
            {`Node "${nodeUrlName}"`
              + ` is not a member of cluster ${clusterUrlName}.`}
          </EmptyStateBody>
        </EmptyState>
      </StackItem>
    </DetailLayout>
  );
};
