import {StackItem, Switch} from "@patternfly/react-core";

import {useNodesAuth} from "./useNodesAuth";
import {useNodesAuthProcesContext} from "./NodesAuthProcessContext";

export const NodesAuthCustomAddrSwitch = (props: {"data-test"?: string}) => {
  const {processId} = useNodesAuthProcesContext();
  const {
    state: {useAddresses},
    switchAddressUse,
  } = useNodesAuth(processId);
  return (
    <StackItem data-test={props["data-test"] ?? "use-custom-address"}>
      <Switch
        id="add-cluster-use-custom-address-port"
        label=""
        aria-label="use custom address port"
        isChecked={useAddresses}
        onChange={() => switchAddressUse(!useAddresses)}
      />{" "}
      Use custom address and port
    </StackItem>
  );
};
