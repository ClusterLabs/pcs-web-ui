import React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  Spinner,
  Title,
} from "@patternfly/react-core";

export const EmptyStateSpinner = (props: {
  title: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState style={{margin: "auto"}} data-test={props["data-test"]}>
      <EmptyStateIcon icon={Spinner} />
      <Title size="lg" headingLevel="h3">
        {props.title}
      </Title>
    </EmptyState>
  );
};
