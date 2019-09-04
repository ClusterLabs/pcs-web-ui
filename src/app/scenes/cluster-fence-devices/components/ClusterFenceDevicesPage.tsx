import React from "react";

import useClusterState from "app/services/cluster/useClusterState";
import { Page, PageSectionDataLoading } from "app/common/components";
import { ClusterTabsSection } from "app/services/cluster";

import ClusterFenceDeviceList from "./ClusterFenceDeviceList";

const ClusterFenceDevicesPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <Page>
      <ClusterTabsSection
        clusterUrlName={clusterUrlName}
        currentTab="fenceDevices"
      />
      <PageSectionDataLoading done={dataLoaded}>
        <ClusterFenceDeviceList
          fenceDeviceList={cluster.fenceDeviceList}
        />
      </PageSectionDataLoading>
    </Page>
  );
};

export default ClusterFenceDevicesPage;
