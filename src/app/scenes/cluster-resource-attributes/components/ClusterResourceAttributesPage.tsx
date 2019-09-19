import React from "react";

import { ResourceDetailPage } from "app/scenes/cluster-resource-detail";
import { useClusterState } from "app/services/cluster";

const ClusterResourceAttributesPage = ({ clusterUrlName, resourceUrlName }: {
  clusterUrlName: string,
  resourceUrlName: string,
}) => {
  useClusterState(clusterUrlName);
  return (
    <ResourceDetailPage
      clusterUrlName={clusterUrlName}
      resourceUrlName={resourceUrlName}
      currentTab="Attributes"
    >
      Attributes
    </ResourceDetailPage>
  );
};

export default ClusterResourceAttributesPage;
