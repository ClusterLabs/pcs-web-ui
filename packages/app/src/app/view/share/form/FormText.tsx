import React from "react";
import {TextInput} from "@patternfly/react-core";

import {FormGroup} from "./FormGroup";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;

export const FormText = ({
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
  isDisabled = false,
  "data-test": dataTest = undefined,
}: {
  id: string;
  onChange?: (value: string) => void;
  value: React.ComponentProps<typeof TextInput>["value"];
  label?: React.ComponentProps<typeof FormGroup>["label"];
  helperTextInvalid?: React.ReactNode;
  isRequired?: boolean;
  isValid?: boolean;
  showValidationErrors?: boolean;
  popover?: FormGroupProps["popover"];
  placeholder?: string;
  isDisabled?: boolean;
  ["data-test"]?: string | undefined;
}) => {
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      fieldId={id}
      helperTextInvalid={helperTextInvalid}
      isValid={isValid}
      showValidationErrors={showValidationErrors}
      popover={popover}
    >
      <TextInput
        id={id}
        value={value}
        isRequired={isRequired}
        type="text"
        data-test={dataTest}
        onChange={onChange ? (_event, value) => onChange(value) : onChange}
        validated={!isValid && showValidationErrors ? "error" : "default"}
        placeholder={placeholder}
        isDisabled={isDisabled}
      />
    </FormGroup>
  );
};
