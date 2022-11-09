import React from "react";

import {selectors} from "app/store";
import {Select, useClusterSelector} from "app/view/share";

type FenceAgentList = selectors.ExtractClusterSelector<
  typeof selectors.getFenceAgentList
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

export const NameTypeTypeSelect = ({
  onSelect,
  onClear,
  agentName,
}: {
  onSelect: (_value: string) => void;
  onClear: () => void;
  agentName: string;
}) => {
  const [fenceAgentList] = useClusterSelector(selectors.getFenceAgentList);
  const {filteredFenceAgentList, onFilter} = useFiltering(fenceAgentList);

  return (
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
    ></Select>
  );
};
