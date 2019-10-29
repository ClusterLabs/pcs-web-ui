import React from "react";
import { DataList } from "@patternfly/react-core";

import { FenceDevice } from "app/services/cluster/types";
import { NoItemCase } from "app/common/components";

import FenceDeviceListItem from "./FenceDeviceListItem";

const FenceDeviceList = ({ fenceDeviceList }: {
  fenceDeviceList: FenceDevice[],
}) => {
  if (fenceDeviceList.length === 0) {
    return <NoItemCase message="No fence device is configured." />;
  }
  return (
    <DataList aria-label="Cluster fence device list">
      {fenceDeviceList.map(fenceDevice => (
        <FenceDeviceListItem
          key={fenceDevice.id}
          fenceDevice={fenceDevice}
        />
      ))}
    </DataList>
  );
};
export default FenceDeviceList;
