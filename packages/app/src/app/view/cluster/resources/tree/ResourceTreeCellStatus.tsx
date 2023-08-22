import {ResourceStatus} from "app/view/cluster/types";
import {ResourceStatusInfoListSigns, StatusIco} from "app/view/share";
import {useGroupDetailViewContext} from "app/view/cluster/share";

type StatusSeverity = ResourceStatus["infoList"][number]["severity"];
type SeverityCount = {severity: StatusSeverity; count: number};

const getSeverityCounts = (
  statusInfoList: ResourceStatus["infoList"],
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

export const ResourceTreeCellStatus = (props: {
  status: ResourceStatus;
  "data-test": string;
}) => {
  const {compact} = useGroupDetailViewContext();
  if (compact) {
    return (
      <span data-test={props["data-test"]}>
        {getSeverityCounts(props.status.infoList).map((sc: SeverityCount) => (
          <div key={sc.severity} className="ha-c-data-list__item-status">
            <StatusIco key={sc.severity} status={sc.severity} />
            {sc.severity !== "OK" && ` ${sc.count}`}
          </div>
        ))}
      </span>
    );
  }
  return (
    <div className="ha-c-data-list__item-status" data-test={props["data-test"]}>
      {" "}
      <ResourceStatusInfoListSigns
        resourceStatusInfoList={props.status.infoList}
        showOkIco
      />
    </div>
  );
};
