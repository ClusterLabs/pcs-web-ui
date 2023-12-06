import React from "react";
import {Radio as PfRadio} from "@patternfly/react-core";

export const Radio = (props: {
  name: string;
  id: string;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  isDisabled?: boolean;
  "data-test"?: string;
}) => {
  const {onChange} = props;
  return (
    <PfRadio
      id={props.id}
      name={props.name}
      isChecked={props.isChecked}
      onChange={onChange ? (_event, checked) => onChange(checked) : onChange}
      label={props.label}
      isDisabled={props.isDisabled}
      data-test={props["data-test"]}
    />
  );
};
