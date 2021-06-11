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
  isValid?: boolean;
  showValidationErrors?: boolean;
  popover?: FormGroupProps["popover"];
  placeholder?: string;
  helperText?: React.ComponentProps<typeof FormGroup>["helperText"];
  ["data-test"]?: string | undefined;
}> = ({
  id,
  onChange,
  value,
  label = undefined,
  isValid = true,
  showValidationErrors = false,
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
      isValid={isValid}
      showValidationErrors={showValidationErrors}
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
        validated={!isValid && showValidationErrors ? "error" : "default"}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};
