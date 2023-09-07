import {TextInput} from "@patternfly/react-core";

import {useNodesAuthProcesContext} from "./NodesAuthProcessContext";
import {useNodesAuth} from "./useNodesAuth";

export const NodesAuthInputPort = (props: {
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
      placeholder="2224"
      type="text"
      id={props.elementId}
      data-test={props["data-test"] ?? props.elementId}
      value={nodeMap[props.nodeName].port}
      onChange={port => updateNode(props.nodeName, {port})}
    />
  );
};
