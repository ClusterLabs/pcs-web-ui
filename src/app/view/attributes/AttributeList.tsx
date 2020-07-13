import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

export function AttributeList<T>({
  attributes,
  children,
}: {
  attributes: T[];
  children: (attribute: T) => JSX.Element;
}) {
  if (attributes.length < 1) {
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon icon={PlusCircleIcon} />
        <Title size="lg" headingLevel="h3">
          No attribute here.
        </Title>
        <EmptyStateBody>No attribute has been added.</EmptyStateBody>
      </EmptyState>
    );
  }
  return (
    <div className="pf-c-content">
      <dl>{attributes.map(a => children(a))}</dl>
    </div>
  );
}
