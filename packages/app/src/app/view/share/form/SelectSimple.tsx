import React from "react";
import {
  MenuToggle,
  Select,
  SelectList,
  SelectOption,
} from "@patternfly/react-core";

export const SelectSimple = <OPT extends string>(props: {
  id: string;
  offeredOptions: OPT[];
  onSelect: (value: OPT) => void;
  selected?: OPT;
  placeholderText?: string;
  isDisabled?: boolean;
  "data-test": string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(
    props.selected && props.selected.length > 0
      ? props.selected
      : props.placeholderText ?? "Select a value",
  );

  return (
    <span data-test={props["data-test"]}>
      <Select
        id={props.id}
        isOpen={isOpen}
        selected={selected}
        onSelect={(_event, value) => {
          if ((props.offeredOptions as (typeof value)[]).includes(value)) {
            props.onSelect(value as OPT);
            setSelected(value as string);
            setIsOpen(false);
          }
        }}
        onOpenChange={isOpen => setIsOpen(isOpen)}
        toggle={toggleRef => (
          <MenuToggle
            ref={toggleRef}
            onClick={() => setIsOpen(!isOpen)}
            isExpanded={isOpen}
            style={{width: "200px"}}
            isDisabled={props.isDisabled}
          >
            {selected}
          </MenuToggle>
        )}
        shouldFocusToggleOnSelect
      >
        <SelectList>
          {props.offeredOptions.map(option => (
            <SelectOption key={option} value={option}>
              {option}
            </SelectOption>
          ))}
        </SelectList>
      </Select>
    </span>
  );
};
