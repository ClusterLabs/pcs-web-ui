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
  id,
  payload: { resourceIds, resourceType },
}: ActionMap["RESOURCE.DELETE"]) {
  const result: api.ResultOf<typeof removeResource> = yield api.authSafe(
    removeResource,
    id.cluster,
    resourceIds,
  );

  yield processClusterResultBasic(
    id.cluster,
    `delete ${formatResourcesFenceDeviceMsg(resourceIds, resourceType)}`,
    result,
  );
}

export default [takeEvery("RESOURCE.DELETE", deleteResource)];
