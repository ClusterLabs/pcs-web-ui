import React from "react";
import { Alert, StackItem, TextContent } from "@patternfly/react-core";

import { types } from "app/store";

export const UtilizationView = ({
  utilizationParams,
}: {
  utilizationParams: types.cluster.NVPair[];
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
        <div className="pf-c-content">
          <dl>
            {utilizationParams.map(p => (
              <React.Fragment key={p.id}>
                <dt>{p.name}</dt>
                <dd>{p.value}</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      </StackItem>
    </>
  );
};
