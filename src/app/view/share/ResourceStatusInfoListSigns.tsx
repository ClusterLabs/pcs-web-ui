import { ResourceStatus } from "app/view/cluster/types";
import { StatusSign } from "app/view/share/StatusSign";
import { toLabel } from "app/view/share/utils";
import { compareStatusSeverity } from "app/view/share/compareStatusSeverity";

export const ResourceStatusInfoListSigns = ({
  resourceStatusInfoList,
  showOkIco = false,
}: {
  resourceStatusInfoList: ResourceStatus["infoList"];
  showOkIco?: boolean;
}) => {
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
