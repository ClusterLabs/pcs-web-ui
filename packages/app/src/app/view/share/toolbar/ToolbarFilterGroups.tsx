import React from "react";
import {
  ToolbarChip,
  ToolbarChipGroup,
  ToolbarFilter,
} from "@patternfly/react-core";

import {SelectCheckboxes} from "app/view/share/form";

function unselectAllOptions<T extends Record<string, boolean>>(options: T): T {
  return Object.keys(options).reduce<T>(
    (newOptions, optionName) => ({...newOptions, [optionName]: false}),
    {} as T,
  );
}

function includedGroupMembers<T extends string>({
  groupInclusionMap,
  groupMembershipMap,
}: {
  groupInclusionMap: Record<T, boolean>;
  groupMembershipMap: Record<T, boolean>;
}) {
  const groupList = Object.keys(groupInclusionMap) as Array<T>;
  return groupList.some(
    group => groupInclusionMap[group] && groupMembershipMap[group],
  );
}

function allOrIncludedGroupMembers<T extends string>({
  groupInclusionMap,
  groupMembershipMap,
}: {
  groupInclusionMap: Record<T, boolean>;
  groupMembershipMap: Record<T, boolean>;
}) {
  const groupList = Object.keys(groupInclusionMap) as Array<T>;
  return (
    groupList.every(group => !groupInclusionMap[group])
    || groupList.some(
      group => groupInclusionMap[group] && groupMembershipMap[group],
    )
  );
}

function useState<T extends string>(initialValue: Record<T, boolean>) {
  return React.useState(initialValue);
}

export const ToolbarFilterGroups = ({
  name,
  filterState,
}: {
  name: string;
  filterState: ReturnType<typeof useState>;
}) => {
  const [options, setSelected] = filterState;

  const select = React.useCallback(
    (value: string) =>
      setSelected({
        ...options,
        [value]: !options[value as keyof typeof options],
      }),
    [options, setSelected],
  );

  const unselect = React.useCallback(
    (_category: string | ToolbarChipGroup, chip: ToolbarChip | string) =>
      setSelected({...options, [chip.toString()]: false}),
    [options, setSelected],
  );

  const unselectAll = React.useCallback(
    (_category: string | ToolbarChipGroup) =>
      setSelected(unselectAllOptions(options)),
    [options, setSelected],
  );

  const groupList = Object.keys(options) as Array<keyof typeof options>;

  return (
    <ToolbarFilter
      chips={groupList.filter(group => options[group])}
      deleteChip={unselect}
      deleteChipGroup={unselectAll}
      categoryName={name}
    >
      <SelectCheckboxes
        insideLabel={name}
        onSelect={select}
        selected={groupList.filter(group => options[group])}
        offeredOptions={Object.keys(options)}
      />
    </ToolbarFilter>
  );
};

ToolbarFilterGroups.unselectAllOptions = unselectAllOptions;
ToolbarFilterGroups.allOrIncludedGroupMembers = allOrIncludedGroupMembers;
ToolbarFilterGroups.includedGroupMembers = includedGroupMembers;
ToolbarFilterGroups.useState = useState;
