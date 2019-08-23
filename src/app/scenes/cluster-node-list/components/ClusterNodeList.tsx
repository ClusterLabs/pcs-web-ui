import React from "react";
import { DataList } from "@patternfly/react-core";

import { Node } from "app/services/cluster/types";

import ClusterNode from "./ClusterNode";

const ClusterNodeList = ({ nodeList }: { nodeList: Node[] }) => (
  <DataList aria-label="Cluster node list">
    {nodeList.map(node => (
      <ClusterNode
        key={node.name}
        nodeName={node.name}
        status={node.status}
      />
    ))}
  </DataList>
);
export default ClusterNodeList;
