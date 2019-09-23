import React from "react";
import { Title } from "@patternfly/react-core";

import { ClusterView, useClusterState } from "app/services/cluster";

const ClusterDetailPage = ({ clusterUrlName }: {
  clusterUrlName: string
}) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterView
      clusterUrlName={clusterUrlName}
      currentTab="Detail"
    >
      <Title size="xl">{cluster.name}</Title>
    </ClusterView>
  );
};

export default ClusterDetailPage;
