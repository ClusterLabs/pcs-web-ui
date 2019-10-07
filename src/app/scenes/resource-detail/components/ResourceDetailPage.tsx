import React from "react";

import { useClusterState } from "app/services/cluster";
import { ResourceDetailView } from "app/scenes/resource-detail";

const ResourceDetailPage = ({ clusterUrlName, resourceUrlName }: {
  clusterUrlName: string,
  resourceUrlName: string,
}) => {
  useClusterState(clusterUrlName);
  return (
    <ResourceDetailView
      clusterUrlName={clusterUrlName}
      resourceUrlName={resourceUrlName}
      currentTab="Details"
    >
      {resourceTreeItem => (
        "Details"
      )}
    </ResourceDetailView>
  );
};

export default ResourceDetailPage;
