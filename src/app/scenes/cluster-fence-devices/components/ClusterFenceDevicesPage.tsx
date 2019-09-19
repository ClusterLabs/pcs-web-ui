import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import ClusterFenceDeviceList from "./ClusterFenceDeviceList";

const ClusterFenceDevicesPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      currentTab="Fence Devices"
    >
      <ClusterFenceDeviceList
        fenceDeviceList={cluster.fenceDeviceList}
      />
    </ClusterPage>
  );
};

export default ClusterFenceDevicesPage;
