import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon, SearchIcon } from "@patternfly/react-icons";

export const EmptyStateNoItem: React.FC<{
  title: React.ReactNode;
  message?: React.ReactNode;
  canAdd?: boolean;
}> = ({ title, message = null, canAdd = true }) => {
  return (
    <EmptyState style={{ margin: "auto" }}>
      <EmptyStateIcon icon={canAdd ? PlusCircleIcon : SearchIcon} />
      <Title size="lg" headingLevel="h3">
        {title}
      </Title>
      {message && <EmptyStateBody>{message}</EmptyStateBody>}
    </EmptyState>
  );
};
