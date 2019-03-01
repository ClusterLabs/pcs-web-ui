import React from "react";
import { Title } from "@patternfly/react-core";

import withClusterState from "app/services/cluster/withClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ClusterOverview from "./ClusterOverview";

export const ClusterOverviewPage = ({
  clusterName,
  cluster,
  useClusterSync,
  dataLoaded,
}) => {
  useClusterSync(clusterName);
  return (
    <ClusterPage clusterName={clusterName}>
      <PageSectionDataLoading done={dataLoaded}>
        <Title size="xl">Settings</Title>
        <ClusterOverview cluster={cluster} />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default withClusterState(ClusterOverviewPage);
