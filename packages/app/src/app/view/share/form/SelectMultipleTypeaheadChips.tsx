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
  TextInputGroupUtilities,
} from "@patternfly/react-core";

export const SelectMultiTypeahead = (props: {
  id: string;
  offeredOptions: string[];
  selected: string[];
  onSelect: (value: string) => void;
}) => {
  const mkId = (suffix = "") => `multi-typeahead-select-${props.id}${suffix}`;
  const optionId = (option: string) => mkId(`-opt-${option.replace(" ", "-")}`);
  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>("");
  const [filteredOpts, setFilteredOpts] = React.useState(props.offeredOptions);
  const [focusedItemIndex, setFocusedItemIndex] = React.useState<number | null>(
    null,
  );
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const textInputRef = React.useRef<HTMLInputElement>();

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
      if (!isOpen) {
        setIsOpen(true);
      }
    }

    setFilteredOpts(newFilteredOpts);
    setFocusedItemIndex(null);
    setActiveItem(null);
  }, [filter, isOpen, props.offeredOptions]);

  const onSelect = (value: string) => {
    if (value) {
      props.onSelect(value);
    }

    textInputRef.current?.focus();
  };

  const setFocusTo = (indexToFocus: number) => {
    if (!isOpen) {
      return;
    }
    setFocusedItemIndex(indexToFocus);
    setActiveItem(optionId(filteredOpts[indexToFocus]));
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const focusedItem = filteredOpts[focusedItemIndex ?? 0];

    switch (event.key) {
      case "Enter":
        if (!isOpen) {
          setIsOpen(isOpenCurrently => !isOpenCurrently);
        } else {
          onSelect(focusedItem);
        }
        break;
      case "Tab":
      case "Escape":
        setIsOpen(false);
        setActiveItem(null);
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusTo(
          focusedItemIndex === null || focusedItemIndex === 0
            ? filteredOpts.length - 1
            : focusedItemIndex - 1,
        );
        break;
      case "ArrowDown":
        event.preventDefault();
        setFocusTo(
          focusedItemIndex === null
            || focusedItemIndex === filteredOpts.length - 1
            ? 0
            : focusedItemIndex + 1,
        );
        break;
    }
  };

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      variant="typeahead"
      onClick={() => setIsOpen(isOpenCurrently => !isOpenCurrently)}
      innerRef={toggleRef}
      isExpanded={isOpen}
      isFullWidth
    >
      <TextInputGroup isPlain>
        <TextInputGroupMain
          value={filter}
          onClick={() => setIsOpen(isOpenCurrently => !isOpenCurrently)}
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
                onClick={ev => {
                  ev.stopPropagation();
                  onSelect(selection);
                }}
              >
                {selection}
              </Chip>
            ))}
          </ChipGroup>
        </TextInputGroupMain>
        <TextInputGroupUtilities></TextInputGroupUtilities>
      </TextInputGroup>
    </MenuToggle>
  );

  return (
    <Select
      id={mkId()}
      isOpen={isOpen}
      selected={props.selected}
      onSelect={(_event, selection) => onSelect(selection as string)}
      onOpenChange={() => setIsOpen(false)}
      toggle={toggle}
    >
      <SelectList isAriaMultiselectable id={mkId("-listbox")}>
        {filteredOpts.map((option, index) => (
          <SelectOption
            key={option}
            isFocused={focusedItemIndex === index}
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
