import React from "react";
import { Title } from "@patternfly/react-core";

import withClusterState from "app/services/cluster/withClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ClusterOverview from "./ClusterOverview";

export const ClusterOverviewPage = ({
  clusterUrlName,
  cluster,
  useClusterSync,
  dataLoaded,
}) => {
  useClusterSync(clusterUrlName);
  return (
    <ClusterPage clusterUrlName={clusterUrlName}>
      <PageSectionDataLoading done={dataLoaded}>
        <Title size="xl">Settings</Title>
        <ClusterOverview cluster={cluster} />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default withClusterState(ClusterOverviewPage);
