import React from "react";

import { types } from "app/store";
import {
  AttributeHelpPopover,
  AttributeList,
  AttributeName,
  AttributeValue,
} from "app/view/share";

export const ClusterPropertiesList = ({
  clusterProperties,
}: {
  clusterProperties: types.clusterProperties.ClusterProperty[];
}) => {
  return (
    <AttributeList attributes={clusterProperties}>
      {property => (
        <React.Fragment key={property.name}>
          <AttributeName name={property.readable_name}>
            <AttributeHelpPopover
              header={property.shortdesc}
              body={property.longdesc}
              defaultValue={property.default}
            />
          </AttributeName>
          <AttributeValue
            value={property.value}
            defaultValue={property.default}
          />
        </React.Fragment>
      )}
    </AttributeList>
  );
};
