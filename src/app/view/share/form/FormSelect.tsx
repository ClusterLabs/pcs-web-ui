import React from "react";

import { FormGroup } from "./FormGroup";
import { Select } from "./Select";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;
type SelectProps = React.ComponentProps<typeof Select>;

export const FormSelect = (props: {
  id: FormGroupProps["fieldId"];
  label: FormGroupProps["label"];
  onSelect: (_value: string) => void;
  selections: SelectProps["selections"];
  popover?: FormGroupProps["popover"];
  className?: FormGroupProps["className"];
  isRequired?: FormGroupProps["isRequired"];
  isDisabled?: boolean;
  placeholderText?: string;
  helperText?: FormGroupProps["helperText"];
  helperTextInvalid?: React.ReactNode;
  isValid?: boolean;
  showValidationErrors?: boolean;
  optionsValues: string[];
  "data-test"?: string;
}) => {
  const {
    id,
    label,
    onSelect,
    selections,
    className = "",
    isRequired = false,
    isDisabled = false,
    isValid = true,
    showValidationErrors = false,
    "data-test": dataTest,
    placeholderText = undefined,
    popover = undefined,
    helperTextInvalid = null,
    helperText = undefined,
  } = props;
  return (
    <FormGroup
      fieldId={id}
      label={label}
      popover={popover}
      className={className}
      isRequired={isRequired}
      helperTextInvalid={helperTextInvalid}
      isValid={isValid}
      showValidationErrors={showValidationErrors}
      helperText={helperText}
    >
      <Select
        id={id}
        variant="single"
        placeholderText={placeholderText ?? ""}
        onSelect={onSelect}
        selections={selections}
        isDisabled={isDisabled}
        optionsValues={props.optionsValues}
        data-test={dataTest}
      />
    </FormGroup>
  );
};
