import { removeResource } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processClusterResultBasic, takeEvery } from "./common";

const formatResourcesFenceDeviceMsg = (
  resourceNameList: string[],
  resourceType: ActionMap["RESOURCE.DELETE"]["payload"]["resourceType"],
) =>
  resourceNameList.length === 1
    ? `${resourceType === "resource" ? "resource" : "fence device"} "${
        resourceNameList[0]
      }"`
    : `${
        resourceType === "resource" ? "resources" : "fence devices"
      } ${resourceNameList.map(r => `"${r}"`).join(", ")}`;

export function* deleteResource({
  payload: { clusterUrlName, resourceIds, resourceType },
}: ActionMap["RESOURCE.DELETE"]) {
  const result: api.ResultOf<typeof removeResource> = yield api.authSafe(
    removeResource,
    clusterUrlName,
    resourceIds,
  );

  yield processClusterResultBasic(
    clusterUrlName,
    `delete ${formatResourcesFenceDeviceMsg(resourceIds, resourceType)}`,
    result,
  );
}

export default [takeEvery("RESOURCE.DELETE", deleteResource)];
