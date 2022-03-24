import { Alert, Form } from "@patternfly/react-core";

import { FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Addresses = () => {
  const {
    state: {
      nodeAddresses,
      libCall: { reports },
    },
    updateState,
  } = useTask();

  type AddrName = keyof typeof nodeAddresses;
  const changeAddress = (addressName: AddrName) => (value: string) => {
    updateState({ nodeAddresses: { ...nodeAddresses, [addressName]: value } });
  };

  return (
    <TaskLibStep title="Specify node addresses" reports={reports}>
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
    </TaskLibStep>
  );
};
