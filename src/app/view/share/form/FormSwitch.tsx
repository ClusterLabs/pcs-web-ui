import React from "react";
import { Switch } from "@patternfly/react-core";

import { FormGroup } from "./FormGroup";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;
type SwitchProps = React.ComponentProps<typeof Switch>;

export const FormSwitch: React.FC<{
  id: FormGroupProps["fieldId"];
  label: FormGroupProps["label"];
  isDisabled?: SwitchProps["isDisabled"];
  isChecked: SwitchProps["isChecked"];
  onChange: SwitchProps["onChange"];
  popover?: FormGroupProps["popover"];
  ["data-test"]?: string;
}> = ({
  id,
  label,
  isDisabled,
  isChecked,
  onChange,
  "data-test": dataTest,
  popover = undefined,
}) => {
  return (
    <FormGroup fieldId={id} label={label} popover={popover}>
      <Switch
        isDisabled={isDisabled}
        id={id}
        isChecked={isChecked}
        onChange={onChange}
        aria-label={label ? label.toString() : ""}
        data-test={dataTest}
      />
    </FormGroup>
  );
};
