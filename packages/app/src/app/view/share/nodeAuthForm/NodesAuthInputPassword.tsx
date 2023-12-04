import {TextInput} from "app/view/share/form";

import {useNodesAuthProcesContext} from "./NodesAuthProcessContext";
import {useNodesAuth} from "./useNodesAuth";

export const NodesAuthInputPassword = (props: {
  nodeName: string;
  elementId: string;
  index: number;
  "data-test"?: string;
}) => {
  const {processId} = useNodesAuthProcesContext();
  const {
    state: {nodeMap, onePasswordForAll},
    updateNode,
  } = useNodesAuth(processId);
  return (
    <TextInput
      isRequired
      type="password"
      id={props.elementId}
      data-test={props["data-test"] ?? props.elementId}
      value={
        props.index > 0 && onePasswordForAll
          ? ""
          : nodeMap[props.nodeName].password
      }
      onChange={password => updateNode(props.nodeName, {password})}
      isDisabled={props.index > 0 && onePasswordForAll}
    />
  );
};
