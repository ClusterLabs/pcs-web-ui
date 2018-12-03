import React from "react";
import {
  Form,
  FormGroup,
  TextInput,
} from "@patternfly/react-core";

const ClusterProperties = ({ properties }) => (
  <Form isHorizontal>
    {properties.map(property => (
      <FormGroup
        key={property.name}
        label={`${property.label}:`}
        fieldId={`cluster-property-${property.name}`}
      >
        <TextInput
          isRequired
          type="text"
          id={`cluster-property-value-${property.name}`}
          name={property.name}
          value=""
        />
      </FormGroup>
    ))}

  </Form>
);
export default ClusterProperties;
