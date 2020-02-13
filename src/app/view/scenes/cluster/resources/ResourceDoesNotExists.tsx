import React from "react";
import { Alert, StackItem } from "@patternfly/react-core";

import { DetailLayout } from "app/view/common";

export const ResourceDoesNotExists = ({ resourceUrlName, onClose }: {
  resourceUrlName: string;
  onClose: React.ComponentProps<typeof DetailLayout>["onClose"],
}) => {
  return (
    <DetailLayout
      onClose={onClose}
      caption={<strong>{resourceUrlName}</strong>}
    >
      <StackItem>
        <Alert
          isInline
          variant="danger"
          title={`Resource "${resourceUrlName}" does not exist.`}
        />
      </StackItem>
    </DetailLayout>
  );
};
