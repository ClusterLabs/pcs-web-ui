import React from "react";
import { DataList } from "@patternfly/react-core";

import { types } from "app/store";

import { NodeListItem } from "./NodeListItem";

export const NodeList = ({ nodeList }: { nodeList: types.cluster.Node[] }) => (
  <DataList data-test="cluster-nodes" aria-label="Cluster nodes">
    {nodeList.map(node => (
      <NodeListItem key={node.name} node={node} />
    ))}
  </DataList>
);
