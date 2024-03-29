import {StackItem} from "@patternfly/react-core";

import {EmptyStateNoItem} from "app/view/share";
import {DetailLayout, useLoadedCluster} from "app/view/cluster/share";

export const NodeDoesNotExists = ({nodeName}: {nodeName: string}) => {
  const {clusterName} = useLoadedCluster();
  return (
    <DetailLayout caption={<strong>{nodeName}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Node "${nodeName}" does not exist.`}
          message={`Node "${nodeName}" is not a member of cluster ${clusterName}.`}
        />
      </StackItem>
    </DetailLayout>
  );
};
