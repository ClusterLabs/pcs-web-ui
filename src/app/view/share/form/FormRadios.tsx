import React from "react";

import { FormGroup } from "./FormGroup";
import { FormRadioGroup } from "./FormRadioGroup";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;

export function FormRadios<OPTION extends string>({
  id,
  options,
  selected,
  label,
  onChange,
  popover = undefined,
  className = "",
  isRequired = false,
}: {
  id: FormGroupProps["fieldId"];
  label: FormGroupProps["label"];
  options: OPTION[];
  selected: OPTION;
  onChange: (_value: OPTION) => void;
  popover?: FormGroupProps["popover"];
  className?: FormGroupProps["className"];
  isRequired?: FormGroupProps["isRequired"];
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
      />
    </FormGroup>
  );
}
