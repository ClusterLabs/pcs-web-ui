import React from "react";
import { DataList } from "@patternfly/react-core";

import { Node } from "app/view/cluster/types";

import { NodeListItem } from "./NodeListItem";

export const NodeList: React.FC<{ nodeList: Node[] }> = ({ nodeList }) => {
  return (
    <DataList data-test="cluster-nodes" aria-label="Cluster nodes">
      {nodeList.map(node => (
        <NodeListItem key={node.name} node={node} />
      ))}
    </DataList>
  );
};
