import React from "react";

import { ClusterView, useClusterState } from "app/services/cluster";

import NodeList from "./NodeList";

const NodeListPage = ({ clusterUrlName }: { clusterUrlName: string }) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterView
      clusterUrlName={clusterUrlName}
      currentTab="Nodes"
    >
      <NodeList
        nodeList={cluster.nodeList}
      />
    </ClusterView>
  );
};

export default NodeListPage;
