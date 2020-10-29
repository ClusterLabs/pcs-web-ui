import React from "react";
import { Form, FormGroup, TextInput } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddNodeName: React.FC = () => {
  const {
    state: { nodeName },
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
          helperTextInvalid="Please provide the new node name"
        >
          <TextInput
            id="new-node-name"
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
