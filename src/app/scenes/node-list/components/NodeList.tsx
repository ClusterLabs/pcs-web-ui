import React from "react";
import { DataList } from "@patternfly/react-core";

import { Node } from "app/services/cluster/types";

import NodeListItem from "./NodeListItem";

const NodeList = ({ nodeList }: { nodeList: Node[] }) => (
  <DataList aria-label="Cluster node list">
    {nodeList.map(node => (
      <NodeListItem
        key={node.name}
        nodeName={node.name}
        status={node.status}
      />
    ))}
  </DataList>
);
export default NodeList;
