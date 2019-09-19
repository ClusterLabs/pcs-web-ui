import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import ResourceList from "./ResourceList";

const ClusterResourceListPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
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
