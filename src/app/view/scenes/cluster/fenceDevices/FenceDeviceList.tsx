import React from "react";
import { DataList } from "@patternfly/react-core";

import { types } from "app/store";
import { NoItemCase } from "app/view/common";

import FenceDeviceListItem from "./FenceDeviceListItem";

const FenceDeviceList = ({ fenceDeviceList }: {
  fenceDeviceList: types.cluster.FenceDevice[],
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
