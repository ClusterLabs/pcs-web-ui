import {Flex, FlexItem} from "@patternfly/react-core";

import {FormGroup, FormRadioGroup, Select} from "app/view/share";

import {useTask} from "./useTask";

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
          />
        </FlexItem>
        <FlexItem>
          <Select
            id="select-adajcent-resource"
            label="Resource"
            placeholderText="Select a resource"
            onSelect={value =>
              updateState({adjacentResourceId: value.toString()})
            }
            selections={adjacentResourceId}
            optionsValues={memberResourcesIds.filter(r => r !== resourceId)}
            isDisabled={groupId === ""}
          />
        </FlexItem>
      </Flex>
    </FormGroup>
  );
};
