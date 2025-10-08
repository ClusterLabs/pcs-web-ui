import type React from "react";

import {EmptyStateNoItem} from "app/view/share/emptyState";
import {DescriptionList} from "@patternfly/react-core";

export function AttributeList<T>({
  attributes,
  children,
}: {
  attributes: T[];
  children: (_attribute: T) => React.ReactNode;
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
    <DescriptionList
      isHorizontal
      horizontalTermWidthModifier={{default: "180px"}}
    >
      {attributes.map(a => children(a))}
    </DescriptionList>
  );
}
