import React from "react";
import { Alert, Form } from "@patternfly/react-core";

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
      <Alert
        variant="info"
        isInline
        title="Please specify the number of addresses that is compatible with this cluster"
        style={{ marginBottom: "var(--pf-global--spacer--lg)" }}
      />
      <Form isHorizontal>
        {Object.keys(nodeAddresses).map((addrName, i) => (
          <FormText
            key={addrName}
            id={`new-node-${addrName}`}
            label={`Address ${i + 1}`}
            onChange={changeAddress(addrName as AddrName)}
            value={nodeAddresses[addrName as AddrName]}
          />
        ))}
      </Form>
    </WizardLibStep>
  );
};
