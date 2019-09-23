import React from "react";
import { DataList } from "@patternfly/react-core";

import { FenceDevice } from "app/services/cluster/types";

import FenceDeviceListItem from "./FenceDeviceListItem";

const FenceDeviceList = ({ fenceDeviceList }: {
  fenceDeviceList: FenceDevice[],
}) => (
  <DataList aria-label="Cluster fence device list">
    {fenceDeviceList.map(fenceDevice => (
      <FenceDeviceListItem
        key={fenceDevice.id}
        fenceDevice={fenceDevice}
      />
    ))}
  </DataList>
);
export default FenceDeviceList;
