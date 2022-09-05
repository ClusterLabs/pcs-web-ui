import { Form } from "@patternfly/react-core";

import { FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    isRoleIdValid,
    updateState,
    state: { roleId, showValidationErrors },
  } = useTask();

  return (
    <Form>
      <FormText
        id="role-name"
        label="Role name"
        isRequired
        showValidationErrors={showValidationErrors}
        isValid={isRoleIdValid}
        helperTextInvalid="Please enter a role name"
        onChange={value => updateState({ roleId: value })}
        value={roleId}
      />
    </Form>
  );
};
