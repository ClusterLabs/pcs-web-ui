import React from "react";
import {Radio, Stack, StackItem} from "@patternfly/react-core";

type Checks = "select" | "text";
export const FormSelectOrText = ({
  id,
  checked,
  onChange,
  select,
  selectLabel,
  text,
  textLabel,
}: {
  id: string;
  checked: Checks;
  onChange: (_checked: Checks) => void;
  select: React.ReactNode;
  selectLabel: string;
  text: React.ReactNode;
  textLabel: string;
}) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <Radio
          isChecked={checked === "select"}
          name={`${id}-name-select`}
          onChange={isChecked => onChange(isChecked ? "select" : "text")}
          label={selectLabel}
          id={`${id}-choice-select`}
        />
        {checked === "select" && select}
      </StackItem>
      <StackItem>
        <Radio
          isChecked={checked === "text"}
          name={`${id}-name-text`}
          onChange={isChecked => onChange(isChecked ? "text" : "select")}
          label={textLabel}
          id={`${id}-choice-text`}
        />
        {checked === "text" && text}
      </StackItem>
    </Stack>
  );
};
