import React from "react";
import { StackItem } from "@patternfly/react-core";

import { EmptyStateNoItem } from "app/view/share";
import { DetailLayout, useSelectedClusterName } from "app/view/share";

export const FenceDeviceDoesNotExists: React.FC<{
  fenceDeviceId: string;
}> = ({ fenceDeviceId }) => {
  const clusterName = useSelectedClusterName();
  return (
    <DetailLayout caption={<strong>{fenceDeviceId}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Fence devicce "${fenceDeviceId}" does not exist.`}
          message={
            `Fence device "${fenceDeviceId}"`
            + ` does not exists in cluster ${clusterName}.`
          }
        />
      </StackItem>
    </DetailLayout>
  );
};
