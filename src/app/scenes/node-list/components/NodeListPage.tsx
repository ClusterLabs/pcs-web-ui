import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import NodeList from "./NodeList";

const NodeListPage = ({ clusterUrlName }: { clusterUrlName: string }) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      currentTab="Nodes"
    >
      <NodeList
        nodeList={cluster.nodeList}
      />
    </ClusterPage>
  );
};

export default NodeListPage;
