import React from "react";

import { types } from "app/store";
import { StatusSign } from "app/view/common";
import { toLabel } from "app/view/utils";

export const ResourceTreeCellStatus = ({ status }: {
  status: types.cluster.ResourceStatus;
}) => {
  return (
    <div className="ha-c-data-list__item-status">
      {status.infoList.map((statusInfo) => (
        <StatusSign
          status={statusInfo.severity}
          label={toLabel(statusInfo.label)}
          showOkIco
        />
      ))}
    </div>
  );
};
