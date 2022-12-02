import React from "react";
import {ActionGroup, Button, Form} from "@patternfly/react-core";

import {useDispatch} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {ClusterProperties} from "./useClusterProperties";
import {PropertyFormField} from "./PropertyFormField";

export const PropertiesForm = ({
  close,
  clusterPropertiesDefinition,
  currentClusterProperties,
}: {
  close: () => void;
  clusterPropertiesDefinition: ClusterProperties;
  currentClusterProperties: Record<string, string>;
}) => {
  const [userProperties, setUserProperties] = React.useState<
    Record<string, string>
  >({});
  const {clusterName} = useLoadedCluster();
  const dispatch = useDispatch();
  return (
    <Form isHorizontal style={{maxWidth: "550px"}}>
      {clusterPropertiesDefinition.map(property => (
        <PropertyFormField
          key={property.name}
          property={property}
          userProperty={userProperties[property.name]}
          modifyProperty={(name, value) =>
            setUserProperties({...userProperties, [name]: value})
          }
          {...(property.name in currentClusterProperties
            ? {currentValue: currentClusterProperties[property.name]}
            : {})}
        />
      ))}
      <ActionGroup>
        <Button
          variant="primary"
          onClick={() => {
            dispatch({
              type: "CLUSTER.PROPERTIES.UPDATE",
              key: {clusterName},
              payload: {propertyMap: userProperties},
            });
            close();
          }}
        >
          Save properties
        </Button>
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};
