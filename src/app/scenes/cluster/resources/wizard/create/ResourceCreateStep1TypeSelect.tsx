import React from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectGroup,
  SelectOption,
  SelectOptionObject,
  SelectVariant,
} from "@patternfly/react-core";

import { selectors, types } from "app/store";
import { useSelectedClusterName } from "app/view";

type ResourceAgentMap = types.resourceAgentList.ResourceAgentMap;

const filterSources = (
  search: string,
  sources: ResourceAgentMap,
): ResourceAgentMap => {
  if (search === "") {
    return sources;
  }
  return Object.keys(sources).reduce((filteredSources, group) => {
    const items = sources[group].filter(i =>
      i.toLowerCase().includes(search.toLowerCase()),
    );
    return items.length > 0
      ? { ...filteredSources, [group]: items }
      : filteredSources;
  }, {});
};

const useFiltering = (resourceAgentMap: ResourceAgentMap) => {
  const [search, setSearch] = React.useState("");
  return {
    filteredResourceAgentMap: React.useMemo(
      () => filterSources(search, resourceAgentMap),
      [resourceAgentMap, search],
    ),

    onFilter: React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        return (null as unknown) as React.ReactElement[];
      },
      [],
    ),
  };
};

export const ResourceCreateStep1TypeSelect = ({
  onSelect,
  onClear,
  agentName,
}: {
  onSelect: (value: string) => void;
  onClear: () => void;
  agentName: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { filteredResourceAgentMap, onFilter } = useFiltering(
    useSelector(selectors.getResourceAgentMap(useSelectedClusterName())),
  );

  const select = React.useCallback(
    (
      event: React.MouseEvent | React.ChangeEvent,
      value: string | SelectOptionObject,
    ) => {
      onSelect(value.toString());
      setIsOpen(false);
    },
    [onSelect],
  );

  return (
    <Select
      variant={SelectVariant.checkbox}
      typeAheadAriaLabel="Select a state"
      onToggle={() => setIsOpen(!isOpen)}
      onSelect={select}
      onClear={onClear}
      onFilter={onFilter}
      selections={agentName}
      isOpen={isOpen}
      isGrouped
      hasInlineFilter
      customBadgeText={agentName.length > 0 ? agentName : undefined}
    >
      {Object.keys(filteredResourceAgentMap).map(group => (
        <SelectGroup label={group} key={group}>
          {filteredResourceAgentMap[group].map((item, i) => (
            /* eslint-disable react/no-array-index-key */
            <SelectOption
              key={`${group}:${item}#${i}`}
              value={`${group}:${item}`}
            >
              {item}
            </SelectOption>
          ))}
        </SelectGroup>
      ))}
    </Select>
  );
};
