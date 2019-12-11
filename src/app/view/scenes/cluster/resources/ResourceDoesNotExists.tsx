import React from "react";
import { Alert } from "@patternfly/react-core";

import { DetailLayout } from "app/view/common";

const ResourceDoesNotExists = ({ resourceUrlName, onClose }: {
  resourceUrlName: string;
  onClose: React.ComponentProps<typeof DetailLayout>["onClose"],
}) => {
  return (
    <DetailLayout
      onClose={onClose}
      caption={<strong>{resourceUrlName}</strong>}
    >
      <Alert
        isInline
        variant="danger"
        title={`Resource "${resourceUrlName}" does not exist.`}
      />
    </DetailLayout>
  );
};

export default ResourceDoesNotExists;
