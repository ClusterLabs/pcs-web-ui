import React from "react";
import { Link } from "react-router-dom";

import { types } from "app/store";
import { useGroupDetailViewContext } from "app/view/common";

export const FenceDeviceListCellName = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  const { urlPrefix } = useGroupDetailViewContext();
  return (
    <Link
      to={`${urlPrefix}/${fenceDevice.id}`}
      id={`fence-device-list-item-${fenceDevice.id}`}
    >
      <strong>{fenceDevice.id}</strong>
    </Link>
  );
};
