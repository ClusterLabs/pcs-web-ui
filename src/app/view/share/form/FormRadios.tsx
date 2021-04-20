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
}: {
  id: FormGroupProps["fieldId"];
  label: FormGroupProps["label"];
  options: OPTION[];
  selected: OPTION;
  onChange: (value: OPTION) => void;
  popover?: FormGroupProps["popover"];
}) {
  return (
    <FormGroup fieldId={id} label={label} popover={popover}>
      <FormRadioGroup
        id={id}
        options={options}
        selected={selected}
        onChange={onChange}
      />
    </FormGroup>
  );
}
