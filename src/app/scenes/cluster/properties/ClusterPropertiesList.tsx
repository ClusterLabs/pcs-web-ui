import React from "react";

import { types } from "app/store";
import { AttributeHelpPopover } from "app/view";

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
            <dt>
              {`${property.readable_name} `}
              <AttributeHelpPopover
                header={property.shortdesc}
                body={property.longdesc}
                defaultValue={property.default}
              />
            </dt>
            <ClusterPropertiesValue property={property} />
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};
