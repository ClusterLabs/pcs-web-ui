import React from "react";
import {Flex, FlexItem, FlexProps, Spinner} from "@patternfly/react-core";

import {selectors} from "app/store";
import {Select, useClusterSelector} from "app/view/share";

type FenceAgentList = NonNullable<
  selectors.ExtractClusterSelector<typeof selectors.getFenceAgentList>["data"]
>;

const useFiltering = (fenceAgentList: FenceAgentList) => {
  const [search, setSearch] = React.useState("");
  return {
    filteredFenceAgentList: React.useMemo(
      () =>
        search === ""
          ? fenceAgentList
          : fenceAgentList.filter(fa =>
              fa.toLowerCase().includes(search.toLowerCase()),
            ),
      [fenceAgentList, search],
    ),
    onFilter: setSearch,
  };
};

const grow: FlexProps["grow"] = {default: "grow"};

export const NameTypeTypeSelect = ({
  onSelect,
  onClear,
  agentName,
}: {
  onSelect: (_value: string) => void;
  onClear: () => void;
  agentName: string;
}) => {
  const [
    {
      data: fenceAgentListData,
      fetchState: {alreadyLoaded},
    },
  ] = useClusterSelector(selectors.getFenceAgentList);
  const fenceAgentList = fenceAgentListData ?? ([] as FenceAgentList);
  const {filteredFenceAgentList, onFilter} = useFiltering(fenceAgentList);

  return (
    <Flex>
      {!alreadyLoaded && (
        <FlexItem>
          <Spinner isSVG size="lg" />
        </FlexItem>
      )}
      <FlexItem grow={grow}>
        <Select
          variant="typeahead"
          typeAheadAriaLabel="Select a fence device"
          onSelect={onSelect}
          onClear={onClear}
          onFilter={onFilter}
          selections={agentName}
          isGrouped
          hasInlineFilter
          customBadgeText={agentName.length > 0 ? agentName : undefined}
          optionsValues={filteredFenceAgentList}
          data-test="fence-device-agent"
        />
      </FlexItem>
    </Flex>
  );
};
