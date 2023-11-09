import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {roleName} = testMarks.task.aclRoleCreate;

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
    <TaskLibStep title="Enter role name" reports={reports} {...roleName.mark}>
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
          {...roleName.roleId.mark}
        />

        <FormText
          id="role-description"
          label="Description"
          onChange={value => updateState({description: value})}
          value={description}
          {...roleName.description.mark}
        />
      </Form>
    </TaskLibStep>
  );
};
