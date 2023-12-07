import React from "react";
import {
  Badge,
  MenuToggle,
  Select,
  SelectList,
  SelectOption,
} from "@patternfly/react-core";

export const SelectCheckboxes = (props: {
  offeredOptions: string[];
  selected: string[];
  onSelect: (value: string) => void;
  insideLabel: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const {onSelect} = props;

  return (
    <Select
      role="menu"
      isOpen={isOpen}
      selected={props.selected}
      onSelect={
        onSelect
          ? (_event, value) => {
              if (value) {
                onSelect(`${value}`);
              }
            }
          : onSelect
      }
      onOpenChange={(nextOpen: boolean) => setIsOpen(nextOpen)}
      toggle={toggleRef => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen(!isOpen)}
          isExpanded={isOpen}
          style={
            {
              width: "200px",
            } as React.CSSProperties
          }
        >
          {props.insideLabel}
          {props.selected.length > 0 && (
            <Badge isRead>{props.selected.length}</Badge>
          )}
        </MenuToggle>
      )}
    >
      <SelectList>
        {props.offeredOptions.map(option => (
          <SelectOption
            key={option}
            hasCheckbox
            value={option}
            isSelected={props.selected.includes(option)}
          >
            {option}
          </SelectOption>
        ))}
      </SelectList>
    </Select>
  );
};
