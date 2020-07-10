import React from "react";
import { types } from "app/store";

export const FenceDeviceListCellType = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  return (
    <>
      <span>Type </span>
      <strong>{fenceDevice.type}</strong>
    </>
  );
};
