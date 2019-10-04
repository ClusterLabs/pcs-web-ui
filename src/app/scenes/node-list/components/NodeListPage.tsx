import React from "react";

import { ClusterView } from "app/services/cluster";

import NodeList from "./NodeList";

const NodeListPage = ({ clusterUrlName }: { clusterUrlName: string }) => (
  <ClusterView clusterUrlName={clusterUrlName} currentTab="Nodes">
    {cluster => <NodeList nodeList={cluster.nodeList} />}
  </ClusterView>
);

export default NodeListPage;
