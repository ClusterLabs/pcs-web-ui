import React from "react";
import { Form } from "@patternfly/react-core";

import { FormText, WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddAddresses: React.FC = () => {
  const {
    state: { nodeAddresses, reports },
    updateState,
  } = useWizard();

  type AddrName = keyof typeof nodeAddresses;
  const changeAddress = (addressName: AddrName) => (value: string) => {
    updateState({ nodeAddresses: { ...nodeAddresses, [addressName]: value } });
  };

  return (
    <WizardLibStep title="Specify node addresses" reports={reports}>
      <Form isHorizontal>
        {Object.keys(nodeAddresses).map((addrName, i) => (
          <FormText
            key={addrName}
            id={`new-node-${addrName}`}
            label={`Adddress ${i + 1}`}
            onChange={changeAddress(addrName as AddrName)}
            value={nodeAddresses[addrName as AddrName]}
          />
        ))}
      </Form>
    </WizardLibStep>
  );
};
