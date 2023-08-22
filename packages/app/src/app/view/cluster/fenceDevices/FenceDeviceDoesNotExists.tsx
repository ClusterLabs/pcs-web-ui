import {StackItem} from "@patternfly/react-core";

import {EmptyStateNoItem} from "app/view/share";
import {DetailLayout, useLoadedCluster} from "app/view/cluster/share";

export const FenceDeviceDoesNotExists = ({
  fenceDeviceId,
}: {
  fenceDeviceId: string;
}) => {
  const {clusterName} = useLoadedCluster();
  return (
    <DetailLayout caption={<strong>{fenceDeviceId}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Fence devicce "${fenceDeviceId}" does not exist.`}
          message={
            `Fence device "${fenceDeviceId}"`
            + ` does not exist in cluster "${clusterName}".`
          }
        />
      </StackItem>
    </DetailLayout>
  );
};
