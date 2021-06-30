import React from "react";
import { Flex, FlexItem } from "@patternfly/react-core";

import { FormGroup, FormRadioGroup, FormSelect, Select } from "app/view/share";

import { useTask } from "./useTask";

export const GroupSelect: React.FC = () => {
  const {
    isGroupValid,
    isAdjacentResourceValid,
    updateState,
    candidateGroupsIds,
    memberResourcesIds,
    state: { groupId, position, adjacentResourceId, showValidationErrors },
  } = useTask();
  return (
    <div className="pf-u-mb-3xl">
      <FormSelect
        id="select-group"
        label="Group"
        placeholderText="Select a group"
        showValidationErrors={showValidationErrors}
        isValid={isGroupValid}
        helperTextInvalid="Please select a group"
        isRequired
        onSelect={value =>
          updateState({ groupId: value.toString(), adjacentResourceId: "" })
        }
        selections={groupId}
        optionsValues={candidateGroupsIds}
      />

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
              onChange={value => updateState({ position: value })}
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
                updateState({ adjacentResourceId: value.toString() })
              }
              selections={adjacentResourceId}
              optionsValues={memberResourcesIds}
              isDisabled={groupId === ""}
            />
          </FlexItem>
        </Flex>
      </FormGroup>
    </div>
  );
};
