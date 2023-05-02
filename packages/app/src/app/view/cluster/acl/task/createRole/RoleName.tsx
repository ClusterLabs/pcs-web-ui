import {Form} from "@patternfly/react-core";

import {FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const RoleName = () => {
  const {
    isNameValid,
    updateState,
    state: {
      libCall: {reports},
      roleId,
      description,
      showValidationErrors,
    },
  } = useTask();
  return (
    <TaskLibStep title="Enter role name" reports={reports}>
      <Form>
        <FormText
          id="role-name"
          label="Name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={isNameValid}
          helperTextInvalid="Please enter a name"
          onChange={value => updateState({roleId: value})}
          value={roleId}
          data-test="role-name"
        />

        <FormText
          id="role-description"
          label="Description"
          onChange={value => updateState({description: value})}
          value={description}
          data-test="role-description"
        />
      </Form>
    </TaskLibStep>
  );
};
