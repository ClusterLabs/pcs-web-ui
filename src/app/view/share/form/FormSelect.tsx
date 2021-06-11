import React from "react";
import { SelectOption } from "@patternfly/react-core";

import { FormGroup } from "./FormGroup";
import { Select } from "./Select";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;
type SelectProps = React.ComponentProps<typeof Select>;

export const FormSelect: React.FC<
  {
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
    "data-test"?: string;
  } & ({ options: SelectProps["children"] } | { optionsValues: string[] })
> = (props) => {
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
        data-test={dataTest}
      >
        {"options" in props
          ? props.options
          : props.optionsValues.map(o => <SelectOption key={o} value={o} />)}
      </Select>
    </FormGroup>
  );
};
