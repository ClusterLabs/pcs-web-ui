import React from "react";

import { useClusterState } from "app/services/cluster";
import { ResourceDetailView } from "app/scenes/resource-detail";

import ResourceDetailTabs from "./ResourceDetailTabs";

const ResourceDetailPage = ({ clusterUrlName, resourceUrlName }: {
  clusterUrlName: string,
  resourceUrlName: string,
}) => {
  useClusterState(clusterUrlName);
  return (
    <ResourceDetailView
      clusterUrlName={clusterUrlName}
      resourceUrlName={resourceUrlName}
      tabs={resource => (
        <ResourceDetailTabs
          resource={resource}
          clusterUrlName={clusterUrlName}
          currentTabs="Details"
        />
      )}
    >
      {resourceTreeItem => (
        "Details"
      )}
    </ResourceDetailView>
  );
};

export default ResourceDetailPage;
