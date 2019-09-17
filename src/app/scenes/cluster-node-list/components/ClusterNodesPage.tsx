import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import ClusterNodeList from "./ClusterNodeList";

const ClusterNodesPage = ({ clusterUrlName }: { clusterUrlName: string }) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      clusterDataLoaded={dataLoaded}
      currentTab="nodes"
    >
      <ClusterNodeList
        nodeList={cluster.nodeList}
      />
    </ClusterPage>
  );
};

export default ClusterNodesPage;
