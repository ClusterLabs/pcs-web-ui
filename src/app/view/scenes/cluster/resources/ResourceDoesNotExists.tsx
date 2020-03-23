import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
  StackItem,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { DetailLayout } from "app/view/common";

export const ResourceDoesNotExists = ({ resourceUrlName, onClose }: {
  resourceUrlName: string;
  onClose: React.ComponentProps<typeof DetailLayout>["onClose"],
}) => {
  return (
    <DetailLayout
      onClose={onClose}
      caption={<strong>{resourceUrlName}</strong>}
    >
      <StackItem>
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon icon={PlusCircleIcon} />
          <Title size="lg">
            {`Resource "${resourceUrlName}" does not exist.`}
          </Title>
          <EmptyStateBody>
            {`You don't have configured resource "${resourceUrlName}" here.`}
          </EmptyStateBody>
        </EmptyState>
      </StackItem>
    </DetailLayout>
  );
};
