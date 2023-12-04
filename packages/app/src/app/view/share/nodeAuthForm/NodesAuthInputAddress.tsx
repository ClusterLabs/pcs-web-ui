import {TextInput} from "app/view/share/form";

import {useNodesAuthProcesContext} from "./NodesAuthProcessContext";
import {useNodesAuth} from "./useNodesAuth";

export const NodesAuthInputAddress = (props: {
  nodeName: string;
  elementId: string;
  "data-test"?: string;
}) => {
  const {processId} = useNodesAuthProcesContext();
  const {
    state: {nodeMap, useAddresses},
    updateNode,
  } = useNodesAuth(processId);
  return (
    <TextInput
      isDisabled={!useAddresses}
      type="text"
      id={props.elementId}
      data-test={props["data-test"] ?? props.elementId}
      value={nodeMap[props.nodeName].address}
      onChange={address => updateNode(props.nodeName, {address})}
    />
  );
};
