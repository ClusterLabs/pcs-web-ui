import React from "react";
import { Title } from "@patternfly/react-core";

import { ClusterPage, useClusterState } from "app/services/cluster";

const ClusterDetailPage = ({ clusterUrlName }: {
  clusterUrlName: string
}) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      currentTab="Detail"
    >
      <Title size="xl">{cluster.name}</Title>
    </ClusterPage>
  );
};

export default ClusterDetailPage;
