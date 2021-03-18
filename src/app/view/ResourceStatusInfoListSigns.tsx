import React from "react";

import { types } from "app/store";
import { StatusSign } from "app/view/StatusSign";
import { toLabel } from "app/view/utils";
import { compareStatusSeverity } from "app/view/compareStatusSeverity";

export const ResourceStatusInfoListSigns: React.FC<{
  resourceStatusInfoList: types.cluster.ResourceStatusInfo[];
  showOkIco?: boolean;
}> = ({ resourceStatusInfoList, showOkIco = false }) => {
  return (
    <>
      {resourceStatusInfoList
        .sort((i1, i2) => compareStatusSeverity(i1.severity, i2.severity) * -1)
        .map((statusInfo, i) => (
          <StatusSign
            key={i}
            status={statusInfo.severity}
            label={toLabel(statusInfo.label)}
            showOkIco={showOkIco}
          />
        ))}
    </>
  );
};
