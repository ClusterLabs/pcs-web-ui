import React from "react";

import useClusterState from "app/services/cluster/useClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ResourceList from "./ResourceList";

const ClusterResourceListPage = ({ clusterUrlName }) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage clusterUrlName={clusterUrlName}>
      <PageSectionDataLoading done={dataLoaded}>
        <ResourceList
          resourceList={cluster.resourceList}
        />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default ClusterResourceListPage;
