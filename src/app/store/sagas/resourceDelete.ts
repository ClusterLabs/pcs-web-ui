import { removeResource } from "app/backend";
import { PrimitiveResourceActions } from "app/store/actions";

import {
  api,
  formatResourcesMsg,
  processError,
  put,
  putNotification,
  takeEvery,
} from "./common";

export function* deleteResource({
  payload: { clusterUrlName, resourceIds },
}: PrimitiveResourceActions["ActionDelete"]) {
  const result: api.ResultOf<typeof removeResource> = yield api.authSafe(
    removeResource,
    clusterUrlName,
    resourceIds,
  );

  const taskLabel = `delete ${formatResourcesMsg(resourceIds)}`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }

  yield put({ type: "CLUSTER_DATA.REFRESH", payload: { clusterUrlName } });
  yield putNotification("SUCCESS", `Task ${taskLabel} successfully done`);
}

export default [takeEvery("RESOURCE.PRIMITIVE.DELETE", deleteResource)];
