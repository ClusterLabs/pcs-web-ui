import {
  EmptyState,
  EmptyStateIcon,
  Spinner,
  Title,
} from "@patternfly/react-core";
import React from "react";

export const NodeAddPrepareNodeWaiting: React.FC<{ message: string }> = ({
  message,
}) => {
  return (
    <EmptyState style={{ margin: "auto" }}>
      <EmptyStateIcon variant="container" component={Spinner} />
      <Title size="lg" headingLevel="h3">
        {message}
      </Title>
    </EmptyState>
  );
};
