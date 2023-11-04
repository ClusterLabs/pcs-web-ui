import React from "react";
import {useSelector} from "react-redux";
import {Flex, FlexItem, FlexProps, Spinner} from "@patternfly/react-core";

import {selectors} from "app/store";
import {testMarks} from "app/view/dataTest";
import {Select} from "app/view/share";

import {useTask} from "./useTask";

type FenceAgentList = NonNullable<
  ReturnType<ReturnType<typeof selectors.getFenceAgentList>>
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
  const {
    state: {clusterName},
  } = useTask();
  const fenceAgentList = useSelector(selectors.getFenceAgentList(clusterName));
  const {filteredFenceAgentList, onFilter} = useFiltering(
    fenceAgentList ?? ([] as FenceAgentList),
  );

  return (
    <Flex>
      {!fenceAgentList && (
        <FlexItem>
          <Spinner isSVG size="lg" />
        </FlexItem>
      )}
      <FlexItem grow={grow}>
        <Select
          variant="typeahead"
          typeAheadAriaLabel="Select a fence device agent"
          placeholderText="Select a fence device agent"
          onSelect={onSelect}
          onClear={onClear}
          onFilter={onFilter}
          selections={agentName}
          isGrouped
          customBadgeText={agentName.length > 0 ? agentName : undefined}
          optionsValues={filteredFenceAgentList}
          {...testMarks.task.fenceDeviceCreate.nameType.agentName.mark}
        />
      </FlexItem>
    </Flex>
  );
};
