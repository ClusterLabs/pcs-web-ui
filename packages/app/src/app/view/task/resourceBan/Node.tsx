import {Flex, FlexItem, Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Checkbox, FormGroup, Select, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {resourceBan: task} = testMarks.task;

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
    <TaskLibStep title="Banned node" reports={reports} {...task.node.mark}>
      <Form>
        <Flex>
          <FlexItem>
            <Checkbox
              label="Specify banned node"
              aria-label="Specify banned node"
              id="settings-specify-node"
              isChecked={useNode}
              onChange={(checked: boolean) => updateState({useNode: checked})}
              {...task.node.useNode.mark}
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
                  {...task.node.nodeList.mark}
                />
              </FormGroup>
            </FlexItem>
          )}
        </Flex>
      </Form>
    </TaskLibStep>
  );
};
