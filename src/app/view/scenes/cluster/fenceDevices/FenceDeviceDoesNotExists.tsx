import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { DetailLayout } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

export const FenceDeviceDoesNotExists = ({
  fenceDeviceUrlName,
}: {
  fenceDeviceUrlName: string;
}) => {
  const clusterUrlName = useSelectedClusterName();
  return (
    <DetailLayout caption={<strong>{fenceDeviceUrlName}</strong>}>
      <StackItem>
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon icon={PlusCircleIcon} />
          <Title size="lg">{`Fence devicce "${fenceDeviceUrlName}" does not exist.`}</Title>
          <EmptyStateBody>
            {`Fence device "${fenceDeviceUrlName}"`
              + ` does not exists in cluster ${clusterUrlName}.`}
          </EmptyStateBody>
        </EmptyState>
      </StackItem>
    </DetailLayout>
  );
};