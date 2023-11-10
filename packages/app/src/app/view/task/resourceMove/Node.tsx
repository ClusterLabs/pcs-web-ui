import {
  Checkbox,
  Flex,
  FlexItem,
  Form,
  FormGroup,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Select, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Node = () => {
  const {
    updateState,
    state: {
      useNode,
      node,
      nodeNameList,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title=""
      reports={reports}
      {...testMarks.task.resourceMove.mark}
    >
      <Form>
        <Flex>
          <FlexItem>
            <Checkbox
              label="Use node"
              aria-label="Use node"
              id="settings-use-node"
              isChecked={useNode}
              onChange={(checked: boolean) => updateState({useNode: checked})}
            />
          </FlexItem>
          {useNode && (
            <FlexItem>
              <FormGroup fieldId="settings-node">
                <Select
                  selections={node}
                  placeholderText="Select a node"
                  isDisabled={!useNode}
                  optionsValues={nodeNameList}
                  onSelect={value => updateState({node: value.toString()})}
                />
              </FormGroup>
            </FlexItem>
          )}
        </Flex>
      </Form>
    </TaskLibStep>
  );
};
