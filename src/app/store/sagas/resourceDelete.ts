import { api, removeResource } from "app/backend";
import { PrimitiveResourceActions } from "app/store/actions";

import { put, takeEvery } from "./effects";
import { callAuthSafe } from "./authSafe";
import { callError } from "./backendTools";
import { formatResourcesMsg } from "./lib";
import { putNotification } from "./notifications";

export function* deleteResource({
  payload: { clusterUrlName, resourceIds },
}: PrimitiveResourceActions["ActionDelete"]) {
  const result: api.ResultOf<typeof removeResource> = yield callAuthSafe(
    removeResource,
    clusterUrlName,
    resourceIds,
  );

  const taskLabel = `delete ${formatResourcesMsg(resourceIds)}`;
  if (result.type !== "OK") {
    yield callError(result, taskLabel);
    return;
  }

  yield put({ type: "CLUSTER_DATA.REFRESH", payload: { clusterUrlName } });
  yield putNotification("SUCCESS", `Task ${taskLabel} successfully done`);
}

export default [takeEvery("RESOURCE.PRIMITIVE.DELETE", deleteResource)];
