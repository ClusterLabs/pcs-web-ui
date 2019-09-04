import React from "react";
import { Title } from "@patternfly/react-core";

import useClusterState from "app/services/cluster/useClusterState";
import { Page, PageSectionDataLoading } from "app/common/components";
import { ClusterTabsSection } from "app/services/cluster";

const ClusterOverviewPage = ({ clusterUrlName }: {
  clusterUrlName: string
}) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <Page>
      <ClusterTabsSection
        clusterUrlName={clusterUrlName}
        currentTab="overview"
      />
      <PageSectionDataLoading done={dataLoaded}>
        <Title size="xl">{cluster.name}</Title>
      </PageSectionDataLoading>
    </Page>
  );
};

export default ClusterOverviewPage;
