import React from "react";
import {
  Chip,
  ChipGroup,
  MenuToggle,
  MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
  TextInputGroup,
  TextInputGroupMain,
} from "@patternfly/react-core";

import {useSelectControll} from "./useSelectControll";

export const SelectMultiTypeahead = (props: {
  id: string;
  offeredOptions: string[];
  selected: string[];
  onSelect: (value: string) => void;
}) => {
  const mkId = (suffix = "") => `multi-typeahead-select-${props.id}${suffix}`;
  const optionId = (option: string) => mkId(`-opt-${option.replace(" ", "-")}`);
  const [filter, setFilter] = React.useState<string>("");
  const [filteredOpts, setFilteredOpts] = React.useState(props.offeredOptions);
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const textInputRef = React.useRef<HTMLInputElement>();

  const {
    onInputKeyDown,
    open,
    close,
    switchOpen,
    isOpen,
    isFocused,
    noFocus,
  } = useSelectControll({
    activateItem: i =>
      setActiveItem(i !== null ? optionId(filteredOpts[i]) : null),
    select: i => onSelect(filteredOpts[i ?? 0]),
    itemsCount: filteredOpts.length,
  });

  React.useEffect(() => {
    let newFilteredOpts = props.offeredOptions;

    // Filter menu items based on the text input value when one exists
    if (filter) {
      newFilteredOpts = props.offeredOptions.filter(o =>
        o.toLowerCase().includes(filter.toLowerCase()),
      );

      // When no options are found after filtering, display 'No results found'
      if (!newFilteredOpts.length) {
        newFilteredOpts = [];
      }

      // Open the menu when the input value changes and the new value not empty
      open();
    }

    setFilteredOpts(newFilteredOpts);
    noFocus();
    setActiveItem(null);
  }, [filter, isOpen, open, props.offeredOptions, noFocus]);

  const onSelect = (value: string) => {
    if (value) {
      props.onSelect(value);
    }

    textInputRef.current?.focus();
  };

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      variant="typeahead"
      onClick={switchOpen}
      innerRef={toggleRef}
      isExpanded={isOpen}
      isFullWidth
    >
      <TextInputGroup isPlain>
        <TextInputGroupMain
          value={filter}
          onClick={switchOpen}
          onChange={(_event, value) => setFilter(value)}
          onKeyDown={onInputKeyDown}
          id={mkId("-input")}
          autoComplete="off"
          innerRef={textInputRef}
          placeholder="Select a state"
          {...(activeItem && {"aria-activedescendant": activeItem})}
          role="combobox"
          isExpanded={isOpen}
          aria-controls={mkId("-listbox")}
        >
          <ChipGroup aria-label="Current selections">
            {props.selected.map((selection, index) => (
              <Chip
                key={index}
                onClick={event => {
                  event.stopPropagation();
                  onSelect(selection);
                }}
              >
                {selection}
              </Chip>
            ))}
          </ChipGroup>
        </TextInputGroupMain>
      </TextInputGroup>
    </MenuToggle>
  );

  return (
    <Select
      id={mkId()}
      isOpen={isOpen}
      selected={props.selected}
      onSelect={(_event, selection) => onSelect(`${selection}`)}
      onOpenChange={close}
      toggle={toggle}
    >
      <SelectList isAriaMultiselectable id={mkId("-listbox")}>
        {filteredOpts.map((option, index) => (
          <SelectOption
            key={option}
            isFocused={isFocused(index)}
            id={optionId(option)}
            value={option}
            ref={null}
          >
            {option}
          </SelectOption>
        ))}
      </SelectList>
    </Select>
  );
};
