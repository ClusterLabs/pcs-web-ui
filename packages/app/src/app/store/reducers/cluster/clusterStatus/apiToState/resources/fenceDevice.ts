import {ActionPayload} from "app/store/actions";

import {Cluster} from "../../types";
import {transformIssues} from "../issues";

import {statusToSeverity} from "./statusInfoList";

type ApiStonith = Extract<
  ActionPayload["CLUSTER.STATUS.FETCH.OK"]["resource_list"][number],
  {class_type: "primitive"; stonith: true}
>;
type FenceDevice = Cluster["fenceDeviceList"][number];

const transformStatus = (
  status: ApiStonith["status"],
): FenceDevice["status"] => {
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

export const toFenceDevice = (apiFenceDevice: ApiStonith): FenceDevice => ({
  id: apiFenceDevice.id,
  itemType: "fence-device",
  type: apiFenceDevice.type,
  status: transformStatus(apiFenceDevice.status),
  statusSeverity: statusToSeverity(apiFenceDevice.status),
  issueList: transformIssues(apiFenceDevice),
  agentName: apiFenceDevice.type,
  arguments: apiFenceDevice.instance_attr.reduce(
    (attrMap, nvpair) => ({
      ...attrMap,
      [nvpair.name]: {id: nvpair.id, value: nvpair.value},
    }),
    {},
  ),
});
