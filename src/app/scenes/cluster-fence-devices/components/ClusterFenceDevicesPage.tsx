import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import ClusterFenceDeviceList from "./ClusterFenceDeviceList";

const ClusterFenceDevicesPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      clusterDataLoaded={dataLoaded}
      currentTab="fenceDevices"
    >
      <ClusterFenceDeviceList
        fenceDeviceList={cluster.fenceDeviceList}
      />
    </ClusterPage>
  );
};

export default ClusterFenceDevicesPage;
