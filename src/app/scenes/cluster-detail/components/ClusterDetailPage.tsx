import React from "react";
import { Title } from "@patternfly/react-core";

import { ClusterView } from "app/services/cluster";

const ClusterDetailPage = ({ clusterUrlName }: {
  clusterUrlName: string
}) => (
  <ClusterView
    clusterUrlName={clusterUrlName}
    currentTab="Detail"
  >
    {cluster => <Title size="xl">{cluster.name}</Title>}
  </ClusterView>
);

export default ClusterDetailPage;
