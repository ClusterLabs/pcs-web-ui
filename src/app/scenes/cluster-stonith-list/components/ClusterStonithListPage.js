import React from "react";

import useClusterState from "app/services/cluster/useClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ClusterStonithList from "./ClusterStonithList";

export const ClusterStonithListPage = ({ clusterUrlName }) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage clusterUrlName={clusterUrlName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ClusterStonithList
          stonithList={cluster.stonithList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default ClusterStonithListPage;
