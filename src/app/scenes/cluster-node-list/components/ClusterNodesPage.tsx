import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import ClusterNodeList from "./ClusterNodeList";

const ClusterNodesPage = ({ clusterUrlName }: { clusterUrlName: string }) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      currentTab="Nodes"
    >
      <ClusterNodeList
        nodeList={cluster.nodeList}
      />
    </ClusterPage>
  );
};

export default ClusterNodesPage;
