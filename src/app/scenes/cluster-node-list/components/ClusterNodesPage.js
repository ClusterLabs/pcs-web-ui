import React from "react";

import useClusterState from "app/services/cluster/useClusterState";
import { PageSectionDataLoading, ClusterPage } from "app/components";

import ClusterNodeList from "./ClusterNodeList";

export const ClusterNodesPage = ({ clusterUrlName }) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage clusterUrlName={clusterUrlName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ClusterNodeList
          nodeList={cluster.nodeList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default ClusterNodesPage;
