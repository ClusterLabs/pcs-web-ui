import React from "react";

import { types } from "app/store";
import {
  StatusIco,
  StatusSign,
  useGroupDetailViewContext,
} from "app/view";
import { toLabel } from "app/view/utils";

type StatusSeverity = types.cluster.StatusSeverity;
type SeverityCount = { severity: StatusSeverity; count: number };

const getSeverityCounts = (
  statusInfoList: types.cluster.ResourceStatusInfo[],
): SeverityCount[] => {
  const countsMap = statusInfoList.reduce<Record<StatusSeverity, number>>(
    (counts, statusInfo) => {
      return {
        ...counts,
        [statusInfo.severity]: counts[statusInfo.severity] + 1,
      };
    },
    {
      ERROR: 0,
      WARNING: 0,
      OK: 0,
    },
  );

  return Object.keys(countsMap)
    .filter(severity => countsMap[severity as StatusSeverity] > 0)
    .map(severity => ({
      severity: severity as StatusSeverity,
      count: countsMap[severity as StatusSeverity],
    }));
};

export const ResourceTreeCellStatus = ({
  status,
}: {
  status: types.cluster.ResourceStatus;
}) => {
  const { compact } = useGroupDetailViewContext();
  if (compact) {
    return (
      <>
        {getSeverityCounts(status.infoList).map((sc: SeverityCount) => (
          <div key={sc.severity} className="ha-c-data-list__item-status">
            <StatusIco key={sc.severity} status={sc.severity} />
            {sc.severity !== "OK" && ` ${sc.count}`}
          </div>
        ))}
      </>
    );
  }
  /* eslint-disable react/no-array-index-key */
  return (
    <div className="ha-c-data-list__item-status">
      {" "}
      {status.infoList.map((statusInfo, i) => (
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
