import React from "react";
import { Form, FormGroup, TextInput } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddAddresses: React.FC = () => {
  const {
    state: { nodeAddresses },
    updateState,
  } = useWizard();

  type AddrName = keyof typeof nodeAddresses;
  const changeAddress = (addressName: AddrName) => (value: string) => {
    updateState({ nodeAddresses: { ...nodeAddresses, [addressName]: value } });
  };

  return (
    <WizardLibStep title="Fill node addresses">
      <Form isHorizontal>
        {Object.keys(nodeAddresses).map((addrName, i) => (
          <FormGroup
            key={addrName}
            fieldId={`new-node-${addrName}`}
            label={`Adddress ${i + 1}`}
          >
            <TextInput
              id={`new-node-${addrName}`}
              value={nodeAddresses[addrName as AddrName]}
              type="text"
              onChange={changeAddress(addrName as AddrName)}
            />
          </FormGroup>
        ))}
      </Form>
    </WizardLibStep>
  );
};
