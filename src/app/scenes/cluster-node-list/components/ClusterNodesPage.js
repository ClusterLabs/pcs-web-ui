import React from "react";

import withClusterState from "app/services/cluster/withClusterState";
import { PageSectionDataLoading, ClusterPage } from "app/components";

import ClusterNodeList from "./ClusterNodeList";

export const ClusterNodesPage = ({
  clusterUrlName,
  cluster,
  useClusterSync,
  dataLoaded,
}) => {
  useClusterSync(clusterUrlName);
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

export default withClusterState(ClusterNodesPage);
