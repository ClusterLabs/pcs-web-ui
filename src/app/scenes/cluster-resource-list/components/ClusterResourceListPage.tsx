import React from "react";

import useClusterState from "app/services/cluster/useClusterState";
import { Page, PageSectionDataLoading } from "app/common/components";
import { ClusterTabsSection } from "app/services/cluster";

import ResourceList from "./ResourceList";

const ClusterResourceListPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <Page>
      <ClusterTabsSection
        clusterUrlName={clusterUrlName}
        currentTab="resources"
      />
      <PageSectionDataLoading done={dataLoaded}>
        <ResourceList
          resourceList={cluster.resourceList}
        />
      </PageSectionDataLoading>
    </Page>
  );
};

export default ClusterResourceListPage;
