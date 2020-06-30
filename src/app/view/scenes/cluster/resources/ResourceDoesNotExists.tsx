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

export const ResourceDoesNotExists = ({
  resourceUrlName,
}: {
  resourceUrlName: string;
}) => {
  return (
    <DetailLayout caption={<strong>{resourceUrlName}</strong>}>
      <StackItem>
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon icon={PlusCircleIcon} />
          <Title size="lg" headingLevel="h3">
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
