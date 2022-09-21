import { Form } from "@patternfly/react-core";

import { FormText } from "app/view/share";
import { PermissionAddForm } from "app/view/cluster/acl/PermissionAddForm";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    isNameValid,
    updateState,
    state: { roleId, permissionInfoList, description, showValidationErrors },
  } = useTask();

  return (
    <Form>
      <FormText
        id="role-name"
        label="Name"
        isRequired
        showValidationErrors={showValidationErrors}
        isValid={isNameValid}
        helperTextInvalid="Please enter a name"
        onChange={value => updateState({ roleId: value })}
        value={roleId}
      />

      <FormText
        id="role-description"
        label="Description"
        onChange={value => updateState({ description: value })}
        value={description}
      />

      <PermissionAddForm
        permissionList={permissionInfoList}
        update={permissionList =>
          updateState({ permissionInfoList: permissionList })
        }
      />
    </Form>
  );
};
