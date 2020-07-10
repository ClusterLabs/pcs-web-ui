import React from "react";

import { StatusSign, toLabel, useGroupDetailViewContext } from "app/view";
import { types } from "app/store";

export const FenceDeviceListCellStatus = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  const { compact } = useGroupDetailViewContext();
  return (
    <div className="ha-c-data-list__item-status">
      {compact && <StatusSign status={fenceDevice.statusSeverity} showOkIco />}
      {!compact && (
        <StatusSign
          status={fenceDevice.statusSeverity}
          label={toLabel(fenceDevice.status)}
          showOkIco
        />
      )}
    </div>
  );
};
