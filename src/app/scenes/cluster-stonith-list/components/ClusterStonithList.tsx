import React from "react";
import { DataList } from "@patternfly/react-core";

import { FenceDevice } from "app/services/cluster/types";

import ClusterStonith from "./ClusterStonith";

const ClusterStonithList = ({ fenceDeviceList }: {
  fenceDeviceList: FenceDevice[],
}) => (
  <DataList aria-label="Cluster fence device list">
    {fenceDeviceList.map(fenceDevice => (
      <ClusterStonith
        key={fenceDevice.id}
        fenceDevice={fenceDevice}
      />
    ))}
  </DataList>
);
export default ClusterStonithList;
