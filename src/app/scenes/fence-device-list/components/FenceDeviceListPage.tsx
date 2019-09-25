import React from "react";

import { ClusterView, useClusterState } from "app/services/cluster";

import FenceDeviceList from "./FenceDeviceList";

const FenceDeviceListPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterView
      clusterUrlName={clusterUrlName}
      currentTab="Fence Devices"
    >
      <FenceDeviceList
        fenceDeviceList={cluster.fenceDeviceList}
      />
    </ClusterView>
  );
};

export default FenceDeviceListPage;
