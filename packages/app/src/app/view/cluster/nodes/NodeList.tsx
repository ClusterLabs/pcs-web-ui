import {DataList} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import type {Node} from "app/view/cluster/types";
import {useGroupDetailViewContext} from "app/view/cluster/share";

import {NodeListItem} from "./NodeListItem";

const {list} = testMarks.cluster.nodes;
export const NodeList = ({nodeList}: {nodeList: Node[]}) => {
  const {selectedItemUrlName} = useGroupDetailViewContext();
  return (
    <DataList
      {...list.mark}
      aria-label="Cluster nodes"
      selectedDataListItemId={selectedItemUrlName}
    >
      {nodeList.map(node => (
        <NodeListItem key={node.name} node={node} />
      ))}
    </DataList>
  );
};
