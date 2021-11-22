import { savePermissions } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processError, put, putNotification } from "./common";

export function* permissionsSave({
  key,
  payload,
}: ActionMap["CLUSTER.PERMISSIONS.SAVE"]) {
  const result: api.ResultOf<typeof savePermissions> = yield api.authSafe(
    savePermissions,
    key.clusterName,
    payload,
  );

  if (result.type !== "OK") {
    yield processError(result, "Error while removing permission");
    return;
  }

  yield putNotification("SUCCESS", "Permission removed");
  yield put({
    type: "CLUSTER.PERMISSIONS.LOAD",
    key,
  });
}
