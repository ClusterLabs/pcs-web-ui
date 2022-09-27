import { Form } from "@patternfly/react-core";

import { tools } from "app/store";
import { FormText } from "app/view/share";

import { useTask } from "./useTask";

export const ChooseSubject = () => {
  const {
    isAssigneeValid,
    updateState,
    state: { subjectType, subjectId, showValidationErrors },
  } = useTask();

  return (
    <Form>
      <FormText
        id="subject-name"
        label={`${tools.labelize(subjectType)} name`}
        isRequired
        showValidationErrors={showValidationErrors}
        isValid={isAssigneeValid}
        helperTextInvalid={`Please enter a ${subjectType} name`}
        onChange={value => updateState({ subjectId: value })}
        value={subjectId}
      />
    </Form>
  );
};
