import {testMarks} from "app/view/dataTest";
import {FormSelectSimple} from "app/view/share";

import {useTask} from "./useTask";
import {PositionSelect} from "./PositionSelect";

const {targetGroup} = testMarks.task.resourcePrimitiveGroupChange;

export const GroupSelect = () => {
  const {
    isGroupValid,
    updateState,
    candidateGroupsIds,
    state: {groupId, showValidationErrors},
  } = useTask();
  return (
    <>
      <FormSelectSimple
        id="select-group"
        label="Group"
        placeholderText="Select a group"
        showValidationErrors={showValidationErrors}
        isValid={isGroupValid}
        helperTextInvalid="Please select a group"
        isRequired
        onSelect={value =>
          updateState({groupId: value.toString(), adjacentResourceId: ""})
        }
        selected={groupId}
        offeredOptions={candidateGroupsIds}
        className="pf-v5-u-mb-xl"
        {...targetGroup.mark}
      />

      <PositionSelect />
    </>
  );
};
