import React from "react";
import { StackItem } from "@patternfly/react-core";

import { EmptyStateNoItem } from "app/view";
import { DetailLayout, useSelectedClusterName } from "app/view";

export const FenceDeviceDoesNotExists = ({
  fenceDeviceUrlName,
}: {
  fenceDeviceUrlName: string;
}) => {
  const clusterUrlName = useSelectedClusterName();
  return (
    <DetailLayout caption={<strong>{fenceDeviceUrlName}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Fence devicce "${fenceDeviceUrlName}" does not exist.`}
          message={
            `Fence device "${fenceDeviceUrlName}"`
            + ` does not exists in cluster ${clusterUrlName}.`
          }
        />
      </StackItem>
    </DetailLayout>
  );
};
