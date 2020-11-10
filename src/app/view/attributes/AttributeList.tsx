import React from "react";

import { EmptyStateNoItem } from "app/view/emptyState";

export function AttributeList<T>({
  attributes,
  children,
}: {
  attributes: T[];
  children: (attribute: T) => React.ReactNode;
}) {
  if (attributes.length < 1) {
    return (
      <EmptyStateNoItem
        title="No attribute here."
        message="No attribute has been added."
      />
    );
  }
  return (
    <div className="pf-c-content">
      <dl>{attributes.map(a => children(a))}</dl>
    </div>
  );
}
