import {Form} from "@patternfly/react-core";

import {FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const EnterName = () => {
  const {
    isNameValid,
    updateState,
    state: {
      subjectId,
      subjectType,
      showValidationErrors,
      libCall: {reports},
    },
  } = useTask();

  return (
    <TaskLibStep title={`Enter ${subjectType} name`} reports={reports}>
      <Form>
        <FormText
          id="subject-name"
          label="Name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={isNameValid}
          helperTextInvalid="Please enter a name"
          onChange={value => updateState({subjectId: value})}
          value={subjectId}
        />
      </Form>
    </TaskLibStep>
  );
};
