import React from "react";

import {FormGroup} from "./FormGroup";
import {Switch} from "./Switch";

type FormGroupProps = React.ComponentProps<typeof FormGroup>;
type SwitchProps = React.ComponentProps<typeof Switch>;

export const FormSwitch = ({
  id,
  label,
  isDisabled,
  isChecked,
  onChange,
  switchLabel,
  switchLabelOff,
  isValid = true,
  showValidationErrors = false,
  helperTextInvalid = null,
  "data-test": dataTest,
  popover = undefined,
}: {
  id: FormGroupProps["fieldId"];
  label: FormGroupProps["label"];
  isDisabled?: SwitchProps["isDisabled"];
  isChecked: SwitchProps["isChecked"];
  onChange: SwitchProps["onChange"];
  switchLabel?: SwitchProps["label"];
  switchLabelOff?: SwitchProps["labelOff"];
  helperTextInvalid?: React.ReactNode;
  isValid?: boolean;
  showValidationErrors?: boolean;
  popover?: FormGroupProps["popover"];
  ["data-test"]?: string;
}) => {
  return (
    <FormGroup
      fieldId={id}
      label={label}
      helperTextInvalid={helperTextInvalid}
      isValid={isValid}
      showValidationErrors={showValidationErrors}
      popover={popover}
    >
      <Switch
        isDisabled={isDisabled}
        id={id}
        isChecked={isChecked}
        onChange={onChange}
        label={switchLabel}
        labelOff={switchLabelOff}
        aria-label={label ? label.toString() : ""}
        data-test={dataTest}
      />
    </FormGroup>
  );
};
