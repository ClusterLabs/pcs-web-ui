import React from "react";

import { types } from "app/store";

export const FenceDeviceDetailView = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  return <span>{`${fenceDevice.id}`}</span>;
};
