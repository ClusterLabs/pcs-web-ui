import React from "react";
import { DataList } from "@patternfly/react-core";

import { GroupComponentProps } from "app/view/common/clusterGroupDetail";

import { NodeListItem } from "./NodeListItem";

export const NodeList = ({ cluster }: GroupComponentProps) => (
  <DataList aria-label="Cluster node list">
    {cluster.nodeList.map((node) => (
      <NodeListItem key={node.name} node={node} />
    ))}
  </DataList>
);
