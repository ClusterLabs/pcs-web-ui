import React from "react";
import {
  FormGroup,
  TextInput,
} from "@patternfly/react-core";


const PrimitiveAttributesItemEdit = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const id = `resource-attribute-${label}`;
  return (
    <FormGroup label={label} fieldId={id}>
      <TextInput
        type="text"
        id={id}
        name={id}
        value={value}
      />
    </FormGroup>
  );
};

export default PrimitiveAttributesItemEdit;
