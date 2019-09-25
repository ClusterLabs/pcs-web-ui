import React from "react";

import { ResourceDetailView } from "app/scenes/resource-detail";
import { useClusterState } from "app/services/cluster";

const ResourceAttributesPage = ({ clusterUrlName, resourceUrlName }: {
  clusterUrlName: string,
  resourceUrlName: string,
}) => {
  useClusterState(clusterUrlName);
  return (
    <ResourceDetailView
      clusterUrlName={clusterUrlName}
      resourceUrlName={resourceUrlName}
      currentTab="Attributes"
    >
      Attributes
    </ResourceDetailView>
  );
};

export default ResourceAttributesPage;
