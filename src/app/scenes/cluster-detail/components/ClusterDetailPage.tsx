import React from "react";
import { Title } from "@patternfly/react-core";

import { ClusterPage, useClusterState } from "app/services/cluster";

const ClusterDetailPage = ({ clusterUrlName }: {
  clusterUrlName: string
}) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      clusterDataLoaded={dataLoaded}
      currentTab="Detail"
    >
      <Title size="xl">{cluster.name}</Title>
    </ClusterPage>
  );
};

export default ClusterDetailPage;
