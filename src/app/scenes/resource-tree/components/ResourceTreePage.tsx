import React from "react";

import { ClusterView, useClusterState } from "app/services/cluster";

import ResourceTree from "./ResourceTree";

const ResourceTreePage = ({ clusterUrlName }: { clusterUrlName: string }) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterView
      clusterUrlName={clusterUrlName}
      currentTab="Resources"
    >
      <ResourceTree
        resourceTree={cluster.resourceTree}
        createResourceDetailUrl={
          ResourceTree.createResourceDetailUrl(clusterUrlName)
        }
      />
    </ClusterView>
  );
};

export default ResourceTreePage;
