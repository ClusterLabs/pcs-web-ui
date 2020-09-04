import { types as backendTypes } from "app/backend";
import * as types from "app/store/state/types";

import { transformIssues } from "../issues";

import { statusToSeverity } from "./statusInfoList";

type ApiStonith = backendTypes.clusterStatus.ApiStonith;

const transformStatus = (
  status: ApiStonith["status"],
): types.cluster.FenceDeviceStatusFlag => {
  switch (status) {
    case "blocked":
      return "BLOCKED";
    case "failed":
      return "FAILED";
    case "disabled":
      return "DISABLED";
    case "running":
    default:
      return "RUNNING";
  }
};

export const toFenceDevice = (
  apiFenceDevice: ApiStonith,
): types.cluster.FenceDevice => ({
  id: apiFenceDevice.id,
  type: apiFenceDevice.type,
  status: transformStatus(apiFenceDevice.status),
  statusSeverity: statusToSeverity(apiFenceDevice.status),
  issueList: transformIssues(apiFenceDevice),
  agentName: `${apiFenceDevice.class}:${apiFenceDevice.type}`,
  arguments: apiFenceDevice.instance_attr.reduce(
    (attrMap, nvpair) => ({
      ...attrMap,
      [nvpair.name]: { id: nvpair.id, value: nvpair.value },
    }),
    {},
  ),
});
