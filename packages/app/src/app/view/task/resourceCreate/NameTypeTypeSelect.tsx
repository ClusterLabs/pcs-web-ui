import React from "react";
import {useSelector} from "react-redux";
import {SelectGroup, SelectOption} from "@patternfly/react-core";
import {Flex, FlexItem, FlexProps, Spinner} from "@patternfly/react-core";

import {selectors} from "app/store";
import {testMarks} from "app/view/dataTest";
import {Select} from "app/view/share";

import {useTask} from "./useTask";

type ResourceAgentMap = NonNullable<
  ReturnType<ReturnType<typeof selectors.getResourceAgentMap>>
>;
const grow: FlexProps["grow"] = {default: "grow"};

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
      ? {...filteredSources, [group]: items}
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
  const {
    state: {clusterName},
  } = useTask();
  const resourceAgentMap = useSelector(
    selectors.getResourceAgentMap(clusterName),
  );
  const {filteredResourceAgentMap, onFilter} = useFiltering(
    resourceAgentMap ?? ({} as ResourceAgentMap),
  );

  return (
    <Flex>
      {!resourceAgentMap && (
        <FlexItem>
          <Spinner isSVG size="lg" />
        </FlexItem>
      )}
      <FlexItem grow={grow}>
        <Select
          variant="typeahead"
          typeAheadAriaLabel="Select a resource agent"
          placeholderText="Select a resource agent"
          onSelect={onSelect}
          onClear={onClear}
          onFilter={onFilter}
          selections={agentName}
          isGrouped
          customBadgeText={agentName.length > 0 ? agentName : undefined}
          {...testMarks.task.resourceCreate.nameType.agentName.mark}
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
      </FlexItem>
    </Flex>
  );
};
