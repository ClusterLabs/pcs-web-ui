import React from "react";
import { Radio, SelectOption, Stack, StackItem } from "@patternfly/react-core";

import { FormText } from "./FormText";
import { Select } from "./Select";

type Checks = "select" | "text";
type SelectProps = React.ComponentProps<typeof Select>;
type TextProps = React.ComponentProps<typeof FormText>;
export const FormSelectOrText: React.FC<{
  id: string;
  checked: Checks;
  onChange: (_checked: Checks) => void;
  showValidationErrors?: boolean;
  select: {
    label: string;
    onSelect: (_value: string) => void;
    selections: SelectProps["selections"];
    isDisabled?: boolean;
    placeholderText?: string;
    validated?: SelectProps["validated"];
    isValid?: boolean;
    "data-test"?: string;
  } & ({ options: SelectProps["children"] } | { optionsValues: string[] });
  text: {
    label: string;
    value: TextProps["value"];
    onChange: (_value: string) => void;
    helperTextInvalid: TextProps["helperTextInvalid"];
    isValid?: boolean;
    "data-test"?: string;
  };
}> = ({ id, checked, onChange, select, text, showValidationErrors }) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <Radio
          isChecked={checked === "select"}
          name={`${id}-name-select`}
          onChange={isChecked => onChange(isChecked ? "select" : "text")}
          label={select.label}
          id={`${id}-choice-select`}
        />
        {checked === "select" && (
          <Select
            variant="single"
            placeholderText={select.placeholderText ?? ""}
            validated={
              showValidationErrors && "isValid" in select && !select.isValid
                ? "error"
                : "default"
            }
            onSelect={select.onSelect}
            selections={select.selections}
            isDisabled={select.isDisabled}
            data-test={select["data-test"]}
          >
            {"options" in select
              ? select.options
              : select.optionsValues.map(o => (
                  <SelectOption key={o} value={o} />
                ))}
          </Select>
        )}
      </StackItem>
      <StackItem>
        <Radio
          isChecked={checked === "text"}
          name={`${id}-name-text`}
          onChange={isChecked => onChange(isChecked ? "text" : "select")}
          label={text.label}
          id={`${id}-choice-text`}
        />
        {checked === "text" && (
          <FormText
            id="new-group-name"
            value={text.value}
            isRequired
            onChange={text.onChange}
            helperTextInvalid={text.helperTextInvalid}
            showValidationErrors={showValidationErrors}
            isValid={text.isValid}
            data-test={text["data-test"]}
          />
        )}
      </StackItem>
    </Stack>
  );
};
