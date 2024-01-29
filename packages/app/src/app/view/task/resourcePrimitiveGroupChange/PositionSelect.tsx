import {Flex, FlexItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormGroup, FormRadioGroup, SelectSimple} from "app/view/share";

import {useTask} from "./useTask";

const {resourcePrimitiveGroupChange: task} = testMarks.task;

export const PositionSelect = () => {
  const {
    isAdjacentResourceValid,
    updateState,
    memberResourcesIds,
    state: {
      resourceId,
      groupId,
      position,
      adjacentResourceId,
      showValidationErrors,
    },
  } = useTask();
  return (
    <FormGroup
      fieldId="select-position"
      label="Position in group"
      isRequired
      showValidationErrors={showValidationErrors}
      isValid={isAdjacentResourceValid}
      helperTextInvalid="Please select a resource"
    >
      <Flex>
        <FlexItem>
          <FormRadioGroup
            id="select-position"
            options={["after", "before"]}
            onChange={value => updateState({position: value})}
            selected={position}
            isDisabled={groupId === ""}
            {...task.position.mark}
          />
        </FlexItem>
        <FlexItem>
          <SelectSimple
            id="select-adjacent-resource"
            placeholderText="Select a resource"
            onSelect={value =>
              updateState({adjacentResourceId: value.toString()})
            }
            selected={adjacentResourceId}
            offeredOptions={memberResourcesIds.filter(r => r !== resourceId)}
            isDisabled={groupId === ""}
            {...task.adjacentResource.mark}
          />
        </FlexItem>
      </Flex>
    </FormGroup>
  );
};
