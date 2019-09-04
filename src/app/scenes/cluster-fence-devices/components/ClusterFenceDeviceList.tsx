import React from "react";
import { DataList } from "@patternfly/react-core";

import { FenceDevice } from "app/services/cluster/types";

import ClusterFenceDevice from "./ClusterFenceDevice";

const ClusterFenceDeviceList = ({ fenceDeviceList }: {
  fenceDeviceList: FenceDevice[],
}) => (
  <DataList aria-label="Cluster fence device list">
    {fenceDeviceList.map(fenceDevice => (
      <ClusterFenceDevice
        key={fenceDevice.id}
        fenceDevice={fenceDevice}
      />
    ))}
  </DataList>
);
export default ClusterFenceDeviceList;
