import React from "react";

import { ClusterView } from "app/services/cluster";

import FenceDeviceList from "./FenceDeviceList";

const FenceDeviceListPage = ({ clusterUrlName }: {
  clusterUrlName: string,
}) => (
  <ClusterView
    clusterUrlName={clusterUrlName}
    currentTab="Fence Devices"
  >
    {cluster => <FenceDeviceList fenceDeviceList={cluster.fenceDeviceList} />}
  </ClusterView>
);

export default FenceDeviceListPage;
