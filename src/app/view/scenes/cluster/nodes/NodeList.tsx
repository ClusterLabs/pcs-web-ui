import React from "react";
import { DataList } from "@patternfly/react-core";

import { types } from "app/store";

import { NodeListItem } from "./NodeListItem";

export const NodeList = ({ cluster }: {
  cluster: types.cluster.ClusterState,
}) => (
  <DataList aria-label="Cluster node list">
    {cluster.nodeList.map((node) => (
      <NodeListItem key={node.name} node={node} />
    ))}
  </DataList>
);
