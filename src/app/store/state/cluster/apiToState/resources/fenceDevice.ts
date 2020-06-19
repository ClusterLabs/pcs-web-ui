import { ApiStonith } from "app/backend/types/clusterStatus";

import { types } from "app/store";
import { transformIssues } from "../issues";
import { statusToSeverity } from "./statusInfoList";

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
});
