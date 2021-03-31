import React from "react";
import { TextInput } from "@patternfly/react-core";

import { FormGroup } from "./FormGroup";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;
export const FormText: React.FC<{
  id: string;
  onChange: React.ComponentProps<typeof TextInput>["onChange"];
  value: React.ComponentProps<typeof TextInput>["value"];
  label?: React.ComponentProps<typeof FormGroup>["label"];
  helperTextInvalid?: React.ReactNode;
  isRequired?: boolean;
  validated?: React.ComponentProps<typeof TextInput>["validated"];
  popover?: FormGroupProps["popover"];
  placeholder?: string;
  helperText?: React.ComponentProps<typeof FormGroup>["helperText"];
  ["data-test"]?: string | undefined;
}> = ({
  id,
  onChange,
  value,
  label = undefined,
  validated = "default",
  helperTextInvalid = null,
  isRequired = false,
  placeholder = "",
  popover = undefined,
  helperText = undefined,
  "data-test": dataTest = undefined,
}) => {
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      fieldId={id}
      helperTextInvalid={helperTextInvalid}
      validated={validated}
      helperText={helperText}
      popover={popover}
    >
      <TextInput
        id={id}
        value={value}
        isRequired={isRequired}
        type="text"
        data-test={dataTest}
        onChange={onChange}
        validated={validated}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};
