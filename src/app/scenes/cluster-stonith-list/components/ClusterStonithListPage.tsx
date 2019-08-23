import React from "react";

import useClusterState from "app/services/cluster/useClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ClusterStonithList from "./ClusterStonithList";

const ClusterStonithListPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage clusterUrlName={clusterUrlName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ClusterStonithList
          fenceDeviceList={cluster.fenceDeviceList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default ClusterStonithListPage;
