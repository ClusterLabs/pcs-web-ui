import React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  Spinner,
  Title,
} from "@patternfly/react-core";

export const EmptyStateSpinner = ({
  title: message,
}: {
  title: React.ReactNode;
}) => {
  return (
    <EmptyState style={{margin: "auto"}}>
      <EmptyStateIcon variant="container" component={Spinner} />
      <Title size="lg" headingLevel="h3">
        {message}
      </Title>
    </EmptyState>
  );
};
