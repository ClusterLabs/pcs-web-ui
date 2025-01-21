import type React from "react";

import {FormGroup} from "./FormGroup";
import {SelectSimple} from "./SelectSimple";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;

export const FormSelectSimple = <OPT extends string>(props: {
  id: string;
  label: FormGroupProps["label"];
  offeredOptions: OPT[];
  onSelect: (value: OPT) => void;
  "data-test": string;
  selected?: OPT;
  popover?: FormGroupProps["popover"];
  className?: FormGroupProps["className"];
  isRequired?: FormGroupProps["isRequired"];
  placeholderText?: string;
  helperTextInvalid?: React.ReactNode;
  isValid?: boolean;
  showValidationErrors?: boolean;
}) => {
  const {
    id,
    label,
    onSelect,
    offeredOptions,
    className = "",
    isRequired = false,
    isValid = true,
    showValidationErrors = false,
    "data-test": dataTest,
    placeholderText = undefined,
    popover = undefined,
    helperTextInvalid = null,
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
    >
      <SelectSimple
        id={id}
        offeredOptions={offeredOptions}
        placeholderText={placeholderText ?? ""}
        onSelect={onSelect}
        selected={props.selected}
        data-test={dataTest}
      />
    </FormGroup>
  );
};
