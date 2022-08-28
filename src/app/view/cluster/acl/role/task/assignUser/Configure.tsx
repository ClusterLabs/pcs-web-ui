import { Form } from "@patternfly/react-core";

import { FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    isUserIdValid,
    updateState,
    state: { userId, showValidationErrors },
  } = useTask();

  return (
    <>
      <Form>
        <FormText
          id="user-name"
          label="User name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={isUserIdValid}
          helperTextInvalid="Please enter a user name"
          onChange={value => updateState({ userId: value })}
          value={userId}
        />
      </Form>
    </>
  );
};
