import React from "react";

import { types } from "app/store";
import { StatusSign, useGroupDetailViewContext } from "app/view/common";
import { toLabel } from "app/view/utils";

export const ResourceTreeCellStatus = ({
  status,
}: {
  status: types.cluster.ResourceStatus;
}) => {
  const { compact } = useGroupDetailViewContext();
  return (
    <div className="ha-c-data-list__item-status">
      {compact && <StatusSign status={status.maxSeverity} showOkIco />}
      {!compact
        && status.infoList.map((statusInfo, i) => (
          /* eslint-disable react/no-array-index-key */
          <StatusSign
            key={i}
            status={statusInfo.severity}
            label={toLabel(statusInfo.label)}
            showOkIco
          />
        ))}
    </div>
  );
};
