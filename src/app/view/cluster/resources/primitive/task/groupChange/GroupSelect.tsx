import { FormSelect } from "app/view/share";

import { useTask } from "./useTask";
import { PositionSelect } from "./PositionSelect";

export const GroupSelect = () => {
  const {
    isGroupValid,
    updateState,
    candidateGroupsIds,
    state: { groupId, showValidationErrors },
  } = useTask();
  return (
    <>
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
        className="pf-u-mb-xl"
      />

      <PositionSelect />
    </>
  );
};
