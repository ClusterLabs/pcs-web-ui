import { Form } from "@patternfly/react-core";

import { FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    isGroupIdValid,
    updateState,
    state: { groupId, showValidationErrors },
  } = useTask();

  return (
    <Form>
      <FormText
        id="group-name"
        label="Group name"
        isRequired
        showValidationErrors={showValidationErrors}
        isValid={isGroupIdValid}
        helperTextInvalid="Please enter a group name"
        onChange={value => updateState({ groupId: value })}
        value={groupId}
      />
    </Form>
  );
};
