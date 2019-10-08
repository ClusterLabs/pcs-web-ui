import React from "react";
import { useSelector } from "react-redux";
import { Title, PageSection } from "@patternfly/react-core";

import { selectors } from "app/services/cluster";

const ClusterDetail = () => {
  const cluster = useSelector(selectors.getCluster);
  return (
    <PageSection>
      <Title size="xl">{cluster.name}</Title>
    </PageSection>
  );
};

export default ClusterDetail;
