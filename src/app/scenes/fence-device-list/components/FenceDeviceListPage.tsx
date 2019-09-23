import React from "react";

import { ClusterPage, useClusterState } from "app/services/cluster";

import FenceDeviceList from "./FenceDeviceList";

const FenceDeviceListPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => {
  const { cluster } = useClusterState(clusterUrlName);
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      currentTab="Fence Devices"
    >
      <FenceDeviceList
        fenceDeviceList={cluster.fenceDeviceList}
      />
    </ClusterPage>
  );
};

export default FenceDeviceListPage;
