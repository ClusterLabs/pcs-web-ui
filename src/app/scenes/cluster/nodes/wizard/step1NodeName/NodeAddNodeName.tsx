import React from "react";
import { Form, FormGroup, TextInput } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddNodeName: React.FC = () => {
  const {
    wizardState: { nodeName },
    updateState,
  } = useWizard();

  const changeNodeName = (value: string) => updateState({ nodeName: value });
  return (
    <WizardLibStep title="Choose node name">
      <Form>
        <FormGroup
          label="Node name"
          isRequired
          fieldId="new-node-name"
          helperTextInvalid="Please provide the new noe name"
        >
          <TextInput
            id="new-resource-name"
            value={nodeName}
            isRequired
            type="text"
            onChange={changeNodeName}
          />
        </FormGroup>
      </Form>
    </WizardLibStep>
  );
};
