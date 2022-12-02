import {StackItem} from "@patternfly/react-core";

import {DetailLayout, EmptyStateNoItem, useLoadedCluster} from "app/view/share";

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
