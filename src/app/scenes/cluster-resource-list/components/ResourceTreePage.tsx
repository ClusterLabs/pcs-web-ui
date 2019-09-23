import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import ResourceTree from "./ResourceTree";

const ResourceTreePage = ({ clusterUrlName }: { clusterUrlName: string }) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      currentTab="Resources"
    >
      <ResourceTree
        resourceTree={cluster.resourceTree}
        createResourceDetailUrl={
          ResourceTree.createResourceDetailUrl(clusterUrlName)
        }
      />
    </ClusterPage>
  );
};

export default ResourceTreePage;
