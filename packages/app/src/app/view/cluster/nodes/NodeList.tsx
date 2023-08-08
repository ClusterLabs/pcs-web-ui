import {DataList} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Node} from "app/view/cluster/types";

import {NodeListItem} from "./NodeListItem";

const {list} = testMarks.cluster.nodes;
export const NodeList = ({nodeList}: {nodeList: Node[]}) => {
  return (
    <DataList {...list.mark} aria-label="Cluster nodes">
      {nodeList.map(node => (
        <NodeListItem key={node.name} node={node} />
      ))}
    </DataList>
  );
};
