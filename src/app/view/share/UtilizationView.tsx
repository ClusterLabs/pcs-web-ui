import { Alert, StackItem, TextContent } from "@patternfly/react-core";

import { NVPair } from "app/view/cluster/types";

import { NVPairListView } from "./NVPairListView";

export const UtilizationView = ({
  utilizationParams,
}: {
  utilizationParams: NVPair[];
}) => {
  return (
    <>
      <StackItem>
        <Alert isInline title="Utilization attributes" variant="info">
          <TextContent>
            To configure the capacity that a node provides or a resource
            requires, you can use utilization attributes in node and resource
            objects. A node is considered eligible for a resource if it has
            sufficient free capacity to satisfy the resource’s requirements
          </TextContent>
        </Alert>
      </StackItem>
      <StackItem>
        <NVPairListView nvPairListView={utilizationParams} />
      </StackItem>
    </>
  );
};
