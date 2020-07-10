import React from "react";

import { types } from "app/store";
import { ClusterPropertiesValue } from "./ClusterPropertiesValue";

export const ClusterPropertiesList = ({
  clusterProperties,
}: {
  clusterProperties: types.clusterProperties.ClusterProperties;
}) => {
  return (
    <div className="pf-c-content">
      <dl>
        {clusterProperties.map(property => (
          <React.Fragment key={property.name}>
            <dt>{property.readable_name}</dt>
            <ClusterPropertiesValue property={property} />
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};
