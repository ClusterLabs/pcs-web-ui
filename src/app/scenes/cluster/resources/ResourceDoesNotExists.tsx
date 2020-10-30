import React from "react";
import { StackItem } from "@patternfly/react-core";

import { DetailLayout, EmptyStateNoItem } from "app/view";

export const ResourceDoesNotExists = ({
  resourceUrlName,
}: {
  resourceUrlName: string;
}) => {
  return (
    <DetailLayout caption={<strong>{resourceUrlName}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Resource "${resourceUrlName}" does not exist.`}
          message={`You don't have configured resource "${resourceUrlName}" here.`}
        />
      </StackItem>
    </DetailLayout>
  );
};
