import React from "react";
import { types } from "app/store";

export const ClusterPropertiesValue = ({
  property,
}: {
  property: types.clusterProperties.ClusterProperty;
}) => {
  if (property.value) {
    return <dd>{property.value}</dd>;
  }

  if (property.default.length > 0) {
    return (
      <dd style={{ color: "var(--pf-global--Color--200)" }}>
        <div>{property.default}</div>
        <div style={{ fontStyle: "italic" }}>Default value</div>
      </dd>
    );
  }

  return <dd />;
};
