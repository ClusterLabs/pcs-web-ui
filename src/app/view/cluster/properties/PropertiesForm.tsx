import React from "react";
import { ActionGroup, Button, Form } from "@patternfly/react-core";

import { useDispatch, useSelectedClusterName } from "app/view/share";

import { ClusterProperties } from "./useClusterProperties";
import { PropertyFormField } from "./PropertyFormField";

export const PropertiesForm: React.FC<{
  close: () => void;
  clusterProperties: ClusterProperties;
}> = ({ close, clusterProperties }) => {
  const [userProperties, setUserProperties] = React.useState<
    Record<string, string>
  >({});
  const clusterName = useSelectedClusterName();
  const dispatch = useDispatch();
  return (
    <Form isHorizontal style={{ maxWidth: "550px" }}>
      {clusterProperties.map(property => (
        <PropertyFormField
          key={property.name}
          property={property}
          userProperty={userProperties[property.name]}
          modifyProperty={(name, value) =>
            setUserProperties({ ...userProperties, [name]: value })
          }
        />
      ))}
      <ActionGroup>
        <Button
          variant="primary"
          onClick={() => {
            dispatch({
              type: "CLUSTER.PROPERTIES.UPDATE",
              key: { clusterName },
              payload: { propertyMap: userProperties },
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
