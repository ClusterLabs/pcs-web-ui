import React from "react";

import useClusterState from "app/services/cluster/useClusterState";
import { Page, PageSectionDataLoading } from "app/common/components";
import { ClusterTabsSection } from "app/services/cluster";

import ClusterNodeList from "./ClusterNodeList";

const ClusterNodesPage = ({ clusterUrlName }: { clusterUrlName: string }) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <Page>
      <ClusterTabsSection
        clusterUrlName={clusterUrlName}
        currentTab="nodes"
      />
      <PageSectionDataLoading done={dataLoaded}>
        <ClusterNodeList
          nodeList={cluster.nodeList}
        />
      </PageSectionDataLoading>
    </Page>
  );
};

export default ClusterNodesPage;
