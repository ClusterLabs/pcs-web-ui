import {removeResource} from "app/backend";
import type {ActionMap, ActionPayload} from "app/store/actions";

import {api, processClusterResultBasic} from "./common";

const formatResourcesFenceDeviceMsg = (
  resourceNameList: string[],
  resourceType: ActionPayload["RESOURCE.DELETE"]["resourceType"],
) =>
  resourceNameList.length === 1
    ? `${resourceType === "resource" ? "resource" : "fence device"} "${
        resourceNameList[0]
      }"`
    : `${
        resourceType === "resource" ? "resources" : "fence devices"
      } ${resourceNameList.map(r => `"${r}"`).join(", ")}`;

export function* deleteResource({
  key,
  payload: {resourceIds, resourceType},
}: ActionMap["RESOURCE.DELETE"]) {
  const result: api.ResultOf<typeof removeResource> = yield api.authSafe(
    removeResource,
    key.clusterName,
    resourceIds,
    resourceType === "fence-device",
  );

  yield processClusterResultBasic(
    key.clusterName,
    `delete ${formatResourcesFenceDeviceMsg(resourceIds, resourceType)}`,
    result,
  );
}
