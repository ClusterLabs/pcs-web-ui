import React from "react";
import { Title } from "@patternfly/react-core";

import useClusterState from "app/services/cluster/useClusterState";
import { ClusterPage, PageSectionDataLoading } from "app/components";

import ClusterOverview from "./ClusterOverview";

export const ClusterOverviewPage = ({ clusterUrlName }) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage clusterUrlName={clusterUrlName}>
      <PageSectionDataLoading done={dataLoaded}>
        <Title size="xl">Settings</Title>
        <ClusterOverview cluster={cluster} />
      </PageSectionDataLoading>
    </ClusterPage>
  );
};

export default ClusterOverviewPage;
