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
  return (
    <PfRadio
      id={props.id}
      name={props.name}
      isChecked={props.isChecked}
      onChange={props.onChange}
      label={props.label}
      isDisabled={props.isDisabled}
      data-test={props["data-test"]}
    />
  );
};
