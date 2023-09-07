import {ActionPayload} from "app/store/actions";

import {Cluster, StatusSeverity} from "../../types";
import * as statusSeverity from "../statusSeverity";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];
type ApiResource = ApiCluster["resource_list"][number];

type Resource = Cluster["resourceTree"][number];
type Status = Resource["status"];

export const isDisabled = (apiResource: ApiResource): boolean =>
  apiResource.meta_attr.some(
    apiMetaAttribute =>
      apiMetaAttribute.name === "target-role"
      && apiMetaAttribute.value.toLowerCase() === "stopped",
  );

export function getMaxSeverity<T>(
  list: T[],
  getItemsSeverity: (_item: T) => StatusSeverity,
) {
  return list.reduce<StatusSeverity>(
    (severity, item) => statusSeverity.max(severity, getItemsSeverity(item)),
    "OK",
  );
}

export const buildStatus = (statusInfoList: Status["infoList"]): Status => ({
  infoList: statusInfoList,
  maxSeverity: getMaxSeverity(statusInfoList, info => info.severity),
});

export const statusToSeverity = (
  status: ApiResource["status"],
): StatusSeverity => {
  switch (status) {
    case "blocked":
      return "ERROR";

    case "failed":
      return "ERROR";

    case "disabled":
    case "partially running":
      return "WARNING";

    case "running":
    default:
      return "OK";
  }
};
