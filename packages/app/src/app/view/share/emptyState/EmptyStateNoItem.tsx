import type React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import {PlusCircleIcon, SearchIcon} from "@patternfly/react-icons";

export const EmptyStateNoItem = (props: {
  title: React.ReactNode;
  message?: React.ReactNode;
  canAdd?: boolean;
  "data-test"?: string;
}) => {
  return (
    <EmptyState style={{margin: "auto"}} data-test={props["data-test"]}>
      <EmptyStateIcon icon={props.canAdd ? PlusCircleIcon : SearchIcon} />
      <Title size="lg" headingLevel="h3">
        {props.title}
      </Title>
      {props.message && <EmptyStateBody>{props.message}</EmptyStateBody>}
    </EmptyState>
  );
};
