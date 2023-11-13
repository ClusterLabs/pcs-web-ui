import {Checkbox, Flex, FlexItem, Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormGroup, Select, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Node = () => {
  const {
    updateState,
    isNodeSettingConsistent,
    state: {
      useNode,
      node,
      nodeNameList,
      showValidationErrors,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Destination node"
      reports={reports}
      {...testMarks.task.resourceBan.mark}
    >
      <Form>
        <Flex>
          <FlexItem>
            <Checkbox
              label="Specify destination node"
              aria-label="Specify destination node"
              id="settings-specify-node"
              isChecked={useNode}
              onChange={(checked: boolean) => updateState({useNode: checked})}
            />
          </FlexItem>
          {useNode && (
            <FlexItem>
              <FormGroup
                fieldId="settings-node"
                showValidationErrors={showValidationErrors}
                isValid={isNodeSettingConsistent}
                helperTextInvalid="Please select a node"
              >
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
