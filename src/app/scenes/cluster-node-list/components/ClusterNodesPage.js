import React from "react";

import withClusterState from "app/services/cluster/withClusterState";
import { PageSectionDataLoading, ClusterPage } from "app/components";

import ClusterNodeList from "./ClusterNodeList";

export const ClusterNodesPage = ({
  clusterName,
  cluster,
  useClusterSync,
  dataLoaded,
}) => {
  useClusterSync(clusterName);
  return (
    <ClusterPage clusterName={clusterName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ClusterNodeList
          nodeList={cluster.nodeList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default withClusterState(ClusterNodesPage);
