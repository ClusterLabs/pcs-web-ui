import React from "react";
import {
  FormGroup,
  TextInput,
} from "@patternfly/react-core";


const PrimitiveAttributesItemEdit = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
}) => {
  const id = `resource-attribute-${label}`;
  return (
    <FormGroup label={label} fieldId={id}>
      <TextInput
        type="text"
        id={id}
        name={id}
        defaultValue={value}
        onChange={(updatedValue: string) => onChange(label, updatedValue)}
      />
    </FormGroup>
  );
};

export default PrimitiveAttributesItemEdit;
