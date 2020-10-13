import React from "react";
import { Form, FormGroup, TextInput } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

export const NodeAddNodeName: React.FC = () => {
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
            value=""
            isRequired
            type="text"
            onChange={() => {}}
          />
        </FormGroup>
      </Form>
    </WizardLibStep>
  );
};
