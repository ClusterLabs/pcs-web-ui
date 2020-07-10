import React from "react";
import {
  Select,
  SelectOption,
  SelectOptionObject,
  SelectVariant,
  ToolbarChip,
  ToolbarChipGroup,
  ToolbarFilter,
} from "@patternfly/react-core";

function unselectAllOptions<T extends Record<string, boolean>>(options: T): T {
  return Object.keys(options).reduce<T>(
    (newOptions, optionName) => ({ ...newOptions, [optionName]: false }),
    {} as T,
  );
}

export function FilterGroups<T extends Record<string, boolean>>({
  name,
  options,
  setSelected,
}: {
  name: string;
  options: T;
  setSelected: (selected: T) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const select = React.useCallback(
    (
      event: React.MouseEvent | React.ChangeEvent,
      value: string | SelectOptionObject,
    ) =>
      setSelected({
        ...options,
        [value.toString()]: !options[value.toString()],
      }),
    [options, setSelected],
  );

  const unselect = React.useCallback(
    (dummyCategory: string | ToolbarChipGroup, chip: ToolbarChip | string) =>
      setSelected({ ...options, [chip.toString()]: false }),
    [options, setSelected],
  );

  const unselectAll = React.useCallback(
    (dummyCategory: string | ToolbarChipGroup) =>
      setSelected(unselectAllOptions(options)),
    [options, setSelected],
  );

  return (
    <ToolbarFilter
      chips={Object.keys(options).filter(k => options[k])}
      deleteChip={unselect}
      deleteChipGroup={unselectAll}
      categoryName={name}
    >
      <Select
        variant={SelectVariant.checkbox}
        aria-label={name}
        onToggle={() => setIsOpen(!isOpen)}
        onSelect={select}
        selections={Object.keys(options).filter(n => options[n])}
        isOpen={isOpen}
        placeholderText={name}
      >
        {Object.keys(options).map(o => (
          <SelectOption key={o} value={o} />
        ))}
      </Select>
    </ToolbarFilter>
  );
}

FilterGroups.unselectAllOptions = unselectAllOptions;
