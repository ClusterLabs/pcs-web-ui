import React from "react";
import { Form, FormGroup, TextInput } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddNodeName: React.FC = () => {
  const {
    wizardState: { nodeName, nodeAddresses },
    updateState,
  } = useWizard();

  type AddrName = keyof typeof nodeAddresses;
  const changeNodeName = (value: string) => updateState({ nodeName: value });
  const changeAddress = (addressName: AddrName) => (value: string) => {
    updateState({ nodeAddresses: { ...nodeAddresses, [addressName]: value } });
  };

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
        <FormGroup label="Node addresses" fieldId="new-node-address">
          {Object.keys(nodeAddresses).map(addrName => (
            <FormGroup key={addrName} fieldId={`new-node-${addrName}`}>
              <TextInput
                id={`new-node-${addrName}`}
                value={nodeAddresses[addrName as AddrName]}
                type="text"
                onChange={changeAddress(addrName as AddrName)}
              />
            </FormGroup>
          ))}
        </FormGroup>
      </Form>
    </WizardLibStep>
  );
};
