import React from "react";
import { Form, FormGroup, TextInput } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddNodeName: React.FC = () => {
  const {
    state: { nodeName, showValidationErrors },
    updateNodeName,
  } = useWizard();

  const nodeNameValidated =
    showValidationErrors && nodeName.length === 0 ? "error" : "default";

  return (
    <WizardLibStep title="Choose node name">
      <Form>
        <FormGroup
          label="Node name"
          isRequired
          fieldId="new-node-name"
          helperTextInvalid="Please provide the node name"
          validated={nodeNameValidated}
        >
          <TextInput
            id="new-node-name"
            value={nodeName}
            isRequired
            type="text"
            onChange={updateNodeName}
            validated={nodeNameValidated}
          />
        </FormGroup>
      </Form>
    </WizardLibStep>
  );
};
