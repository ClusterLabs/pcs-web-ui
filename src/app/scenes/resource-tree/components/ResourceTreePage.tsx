import React from "react";

import { ClusterView } from "app/services/cluster";

import ResourceTree from "./ResourceTree";

const ResourceTreePage = ({ clusterUrlName }: { clusterUrlName: string }) => (
  <ClusterView clusterUrlName={clusterUrlName} currentTab="Resources">
    {cluster => (
      <ResourceTree
        resourceTree={cluster.resourceTree}
        createResourceDetailUrl={
          ResourceTree.createResourceDetailUrl(clusterUrlName)
        }
      />
    )}
  </ClusterView>
);

export default ResourceTreePage;
