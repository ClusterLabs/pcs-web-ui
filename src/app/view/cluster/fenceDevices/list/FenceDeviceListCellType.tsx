import React from "react";

import { FenceDevice } from "app/view/cluster/types";

export const FenceDeviceListCellType = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <>
      <span>Type </span>
      <strong>{fenceDevice.type}</strong>
    </>
  );
};
