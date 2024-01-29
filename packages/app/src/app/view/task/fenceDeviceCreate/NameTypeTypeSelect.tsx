import {useSelector} from "react-redux";
import {Flex, FlexItem, FlexProps, Spinner} from "@patternfly/react-core";

import {selectors} from "app/store";
import {testMarks} from "app/view/dataTest";
import {SelectTypeahead} from "app/view/share";

import {useTask} from "./useTask";

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

  return (
    <Flex>
      {!fenceAgentList && (
        <FlexItem>
          <Spinner size="lg" />
        </FlexItem>
      )}
      <FlexItem grow={grow}>
        <SelectTypeahead
          id="select-fence-device-agent"
          placeholderText="Select a fence device agent"
          onSelect={onSelect}
          onClear={onClear}
          selected={agentName}
          offeredOptions={fenceAgentList ?? []}
          {...testMarks.task.fenceDeviceCreate.nameType.agentName.mark}
        />
      </FlexItem>
    </Flex>
  );
};
