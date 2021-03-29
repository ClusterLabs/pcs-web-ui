import React from "react";
import { StackItem } from "@patternfly/react-core";

import { EmptyStateNoItem } from "app/view/share";
import { DetailLayout, useSelectedClusterName } from "app/view/share";

export const FenceDeviceDoesNotExists = ({
  fenceDeviceUrlName,
}: {
  fenceDeviceUrlName: string;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <DetailLayout caption={<strong>{fenceDeviceUrlName}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Fence devicce "${fenceDeviceUrlName}" does not exist.`}
          message={
            `Fence device "${fenceDeviceUrlName}"`
            + ` does not exists in cluster ${clusterName}.`
          }
        />
      </StackItem>
    </DetailLayout>
  );
};
