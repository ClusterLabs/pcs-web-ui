import React from "react";

import { types } from "app/store";
import { StatusSign } from "app/view/common";
import { toLabel } from "app/view/utils";

export const ResourceTreeCellStatus = ({ statusList }: {
  statusList: types.cluster.ResourceStatusInfo[];
}) => {
  return (
    <div className="ha-c-data-list__item-status">
      {statusList.map((status) => (
        <StatusSign
          status={status.severity}
          label={toLabel(status.label)}
          showOkIco
        />
      ))}
    </div>
  );
};
