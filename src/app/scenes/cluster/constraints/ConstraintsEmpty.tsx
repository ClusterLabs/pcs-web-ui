import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

export const ConstraintsEmpty = () => {
  return (
    <EmptyState style={{ margin: "auto" }}>
      <EmptyStateIcon icon={PlusCircleIcon} />
      <Title size="lg" headingLevel="h3">
        {" "}
        No constraint is configured.{" "}
      </Title>
      <EmptyStateBody>
        You don&apos;t have any configured constraint here.
      </EmptyStateBody>
    </EmptyState>
  );
};
