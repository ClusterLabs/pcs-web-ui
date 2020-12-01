import React from "react";
import { Form } from "@patternfly/react-core";

import { FormText, WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const ResourceAddToGroupGroupName: React.FC = () => {
  const {
    updateState,
    state: { reports, groupName, showValidationErrors },
  } = useWizard();

  const groupNameValidated =
    showValidationErrors && groupName.length === 0 ? "error" : "default";

  return (
    <WizardLibStep title="Specify group" reports={reports}>
      <Form data-test="form-group-name">
        <FormText
          id="new-group-name"
          label="Group name"
          onChange={value => updateState({ groupName: value })}
          value={groupName}
          helperTextInvalid="Please provide a group name"
          isRequired
          validated={groupNameValidated}
          data-test="group-name"
        />
      </Form>
    </WizardLibStep>
  );
};
