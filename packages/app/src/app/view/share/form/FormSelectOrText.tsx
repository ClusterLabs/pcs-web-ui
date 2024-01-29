import React from "react";
import {Stack, StackItem} from "@patternfly/react-core";

import {Radio} from "./Radio";

type Checks = "select" | "text";
export const FormSelectOrText = (props: {
  id: string;
  checked: Checks;
  onChange: (_checked: Checks) => void;
  select: React.ReactNode;
  selectLabel: string;
  text: React.ReactNode;
  textLabel: string;
  "data-test"?: string;
}) => {
  return (
    <Stack hasGutter data-test={props["data-test"]}>
      <StackItem>
        <Radio
          isChecked={props.checked === "select"}
          name={`${props.id}-name-select`}
          onChange={isChecked => props.onChange(isChecked ? "select" : "text")}
          label={props.selectLabel}
          id={`${props.id}-choice-select`}
        />
        {props.checked === "select" && props.select}
      </StackItem>
      <StackItem>
        <Radio
          isChecked={props.checked === "text"}
          name={`${props.id}-name-text`}
          onChange={isChecked => props.onChange(isChecked ? "text" : "select")}
          label={props.textLabel}
          id={`${props.id}-choice-text`}
        />
        {props.checked === "text" && props.text}
      </StackItem>
    </Stack>
  );
};
