import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import ResourceList from "./ResourceList";

const ClusterResourceListPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      clusterDataLoaded={dataLoaded}
      currentTab="Resources"
    >
      <ResourceList
        resourceList={cluster.resourceList}
        createResourceDetailUrl={
          ResourceList.createResourceDetailUrl(clusterUrlName)
        }
      />
    </ClusterPage>
  );
};

export default ClusterResourceListPage;
