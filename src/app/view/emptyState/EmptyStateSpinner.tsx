import React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  Spinner,
  Title,
} from "@patternfly/react-core";

export const EmptyStateSpinner: React.FC<{ title: string }> = ({
  title: message,
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
