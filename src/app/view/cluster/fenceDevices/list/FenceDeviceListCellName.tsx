import React from "react";
import { Link } from "react-router-dom";

import { FenceDevice } from "app/view/cluster/types";
import { useGroupDetailViewContext } from "app/view/share";

export const FenceDeviceListCellName = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
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
