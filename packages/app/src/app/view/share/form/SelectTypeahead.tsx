import React from "react";
import {
  Button,
  MenuToggle,
  Select,
  SelectList,
  SelectOption,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import {TimesIcon} from "@patternfly/react-icons";

export const SelectTypeahead = <OPT extends string>(props: {
  id: string;
  offeredOptions: OPT[];
  placeholderText?: string;
  selected: OPT;
  onSelect: (value: OPT) => void;
  onClear: () => void;
  "data-test": string;
}) => {
  const mkId = (suffix = "") => `multi-typeahead-${props.id}${suffix}`;
  const optionId = (option: string) => mkId(`-opt-${option.replace(" ", "-")}`);

  const [search, setSearch] = React.useState("");
  const [currIndex, setCurrIndex] = React.useState<number>(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const textInputRef = React.useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = React.useState<string>(props.selected);

  const filteredOptions: OPT[] = React.useMemo(
    () =>
      props.offeredOptions.filter(o =>
        o.toLowerCase().includes(search.toLowerCase()),
      ),
    [props.offeredOptions, search],
  );

  const itemsCount = filteredOptions.length;

  const onSelect = (option: OPT) => {
    setInputValue(option);
    props.onSelect(option);
  };

  const selectIndex = (i: number) => props.onSelect(filteredOptions[i]);

  const [prevIndex, nextIndex] = React.useMemo(
    () =>
      currIndex === null ? [itemsCount - 1, 0] : [currIndex - 1, currIndex + 1],
    [itemsCount, currIndex],
  );

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = () => setIsOpen(false);
  const switchOpen = () => setIsOpen(isOpenCurrently => !isOpenCurrently);

  const onInputValueChange = (
    _event: React.FormEvent<HTMLInputElement>,
    value: string,
  ) => {
    setSearch(value);
    setInputValue(value);
    setCurrIndex(0);
    open();
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        selectIndex(currIndex);
        break;
      case "Tab":
      case "Escape":
        close();
        break;
      case "ArrowUp":
        event.preventDefault();
        setCurrIndex(prevIndex);
        break;
      case "ArrowDown":
        event.preventDefault();
        setCurrIndex(nextIndex);
        break;
      default:
        break;
    }
  };

  return (
    <span data-test={props["data-test"]}>
      <Select
        id="typeahead-select"
        isOpen={isOpen}
        selected={props.selected}
        onSelect={(_event, value) => {
          if ((props.offeredOptions as (typeof value)[]).includes(value)) {
            onSelect(value as (typeof props.offeredOptions)[number]);
            close();
          }
        }}
        onOpenChange={close}
        isScrollable
        toggle={toggleRef => (
          <MenuToggle
            ref={toggleRef}
            variant="typeahead"
            onClick={switchOpen}
            isExpanded={isOpen}
            isFullWidth
          >
            <TextInputGroup isPlain>
              <TextInputGroupMain
                value={inputValue}
                onClick={switchOpen}
                onChange={onInputValueChange}
                onKeyDown={onInputKeyDown}
                id={mkId("-input")}
                autoComplete="off"
                innerRef={textInputRef}
                placeholder={props.placeholderText ?? "Search"}
                {...(props.selected !== "" && {
                  "aria-activedescendant": optionId(props.selected),
                })}
                role="combobox"
                isExpanded={isOpen}
                aria-controls={mkId("-listbox")}
              />
              <TextInputGroupUtilities>
                {!!inputValue && (
                  <Button
                    variant="plain"
                    onClick={() => {
                      props.onClear();
                      setInputValue("");
                      setSearch("");
                      textInputRef?.current?.focus();
                    }}
                    aria-label="Clear input value"
                  >
                    <TimesIcon aria-hidden />
                  </Button>
                )}
              </TextInputGroupUtilities>
            </TextInputGroup>
          </MenuToggle>
        )}
      >
        <SelectList id="select-typeahead-listbox">
          {filteredOptions.map((option, i) => (
            <SelectOption
              id={optionId(option)}
              key={option}
              value={option}
              isFocused={currIndex === i}
              ref={null}
            >
              {option}
            </SelectOption>
          ))}
        </SelectList>
      </Select>
    </span>
  );
};
