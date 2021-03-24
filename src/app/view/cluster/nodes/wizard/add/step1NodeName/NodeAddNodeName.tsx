import React from "react";
import { Form } from "@patternfly/react-core";

import { FormText, WizardLibStep } from "app/view/share";

import { useWizard } from "../useWizard";

export const NodeAddNodeName: React.FC = () => {
  const {
    state: { nodeName, showValidationErrors, reports },
    updateNodeName,
  } = useWizard();

  const nodeNameValidated =
    showValidationErrors && nodeName.length === 0 ? "error" : "default";

  return (
    <WizardLibStep title="Choose node name" reports={reports}>
      <Form data-test="form-node-name">
        <FormText
          id="new-node-name"
          label="Node name"
          onChange={updateNodeName}
          value={nodeName}
          helperTextInvalid="Please provide the node name"
          isRequired
          validated={nodeNameValidated}
          data-test="node-name"
        />
      </Form>
    </WizardLibStep>
  );
};
