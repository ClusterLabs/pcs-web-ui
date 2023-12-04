import React from "react";
import {Switch as PfSwitch} from "@patternfly/react-core";

type Props = React.ComponentProps<typeof PfSwitch>;

export const Switch = (props: {
  "aria-label"?: string;
  id?: string;
  isChecked?: boolean;
  isDisabled?: Props["isDisabled"];
  labelOff?: Props["labelOff"];
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  "data-test"?: string;
}) => {
  return (
    <PfSwitch
      aria-label={props["aria-label"]}
      id={props.id}
      isChecked={props.isChecked}
      isDisabled={props.isDisabled}
      labelOff={props.labelOff}
      label={props.label}
      onChange={props.onChange}
      data-test={props["data-test"]}
    />
  );
};
