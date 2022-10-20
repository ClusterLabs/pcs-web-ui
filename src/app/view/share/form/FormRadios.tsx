import React from "react";

import { FormGroup } from "./FormGroup";
import { FormRadioGroup } from "./FormRadioGroup";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;
type FormRadioGroupProps = React.ComponentProps<typeof FormRadioGroup>;

export function FormRadios<OPTION extends string>({
  id,
  options,
  selected,
  label,
  onChange,
  popover = undefined,
  className = "",
  isRequired = false,
  isDisabled = false,
  "data-test": dataTest,
}: {
  id: string;
  label: FormGroupProps["label"];
  options: OPTION[];
  selected: OPTION;
  onChange: (_value: OPTION) => void;
  popover?: FormGroupProps["popover"];
  className?: FormGroupProps["className"];
  isRequired?: FormGroupProps["isRequired"];
  isDisabled?: FormRadioGroupProps["isDisabled"];
  ["data-test"]?: string;
}) {
  return (
    <FormGroup
      fieldId={id}
      label={label}
      popover={popover}
      className={className}
      isRequired={isRequired}
    >
      <FormRadioGroup
        id={id}
        options={options}
        selected={selected}
        onChange={onChange}
        isDisabled={isDisabled}
        data-test={dataTest}
      />
    </FormGroup>
  );
}
