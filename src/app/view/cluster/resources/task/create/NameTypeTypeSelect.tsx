import React from "react";
import { SelectGroup, SelectOption } from "@patternfly/react-core";

import { selectors } from "app/store";
import { Select, useClusterSelector } from "app/view/share";

type ResourceAgentMap = selectors.ExtractClusterSelector<
  typeof selectors.getResourceAgentMap
>;

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

    onFilter: setSearch,
  };
};

export const NameTypeTypeSelect = ({
  onSelect,
  onClear,
  agentName,
}: {
  onSelect: (_value: string) => void;
  onClear: () => void;
  agentName: string;
}) => {
  const [resourceAgentMap] = useClusterSelector(selectors.getResourceAgentMap);
  const { filteredResourceAgentMap, onFilter } = useFiltering(resourceAgentMap);

  return (
    <Select
      variant="typeahead"
      typeAheadAriaLabel="Select a state"
      onSelect={onSelect}
      onClear={onClear}
      onFilter={onFilter}
      selections={agentName}
      isGrouped
      hasInlineFilter
      customBadgeText={agentName.length > 0 ? agentName : undefined}
      data-test="resource-agent"
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
