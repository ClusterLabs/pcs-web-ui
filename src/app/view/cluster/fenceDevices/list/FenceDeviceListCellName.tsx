import React from "react";

import { FenceDevice } from "app/view/cluster/types";
import { Link } from "app/view/share";

export const FenceDeviceListCellName: React.FC<{
  fenceDevice: FenceDevice;
}> = ({ fenceDevice }) => {
  return (
    <Link to={`/${fenceDevice.id}`}>
      <strong>{fenceDevice.id}</strong>
    </Link>
  );
};
