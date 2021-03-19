import { api } from "app/backend";

import {
  ResourceStatus,
  ResourceStatusInfo,
  StatusSeverity,
} from "../../types";
import * as statusSeverity from "../statusSeverity";

type ApiResource = api.types.clusterStatus.ApiResource;
type ApiResourceBase = api.types.clusterStatus.ApiResourceBase;

export const isDisabled = (apiResource: ApiResourceBase): boolean =>
  apiResource.meta_attr.some(
    apiMetaAttribute =>
      apiMetaAttribute.name === "target-role"
      && apiMetaAttribute.value.toLowerCase() === "stopped",
  );

export function getMaxSeverity<T>(
  list: T[],
  getItemsSeverity: (item: T) => StatusSeverity,
) {
  return list.reduce<StatusSeverity>(
    (severity, item) => statusSeverity.max(severity, getItemsSeverity(item)),
    "OK",
  );
}

export const buildStatus = (
  statusInfoList: ResourceStatusInfo[],
): ResourceStatus => {
  return {
    infoList: statusInfoList,
    maxSeverity: getMaxSeverity(statusInfoList, info => info.severity),
  };
};

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
