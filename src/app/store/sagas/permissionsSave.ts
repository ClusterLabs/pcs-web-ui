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
    key.permissionName,
    payload,
  );

  if (result.type !== "OK") {
    yield processError(result, key.permissionName);
    return;
  }

  yield putNotification("SUCCESS", "Permission removed");
  yield put({ type: "CLUSTER.LIST.REFRESH" });
}
