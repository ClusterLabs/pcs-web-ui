import { savePermissions } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processError, put, putNotification } from "./common";

type SaveAction = ActionMap["CLUSTER.PERMISSIONS.SAVE"];
type ApiResult = api.ResultOf<typeof savePermissions>;

function* processRemoveResult(result: ApiResult) {
  if (result.type !== "OK") {
    yield processError(result, "remove permission");
    return;
  }
  yield putNotification("SUCCESS", "Permission removed");
}

function* processCreateResult(result: ApiResult) {
  const taskLabel = "create permission";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      useNotification: false,
      action: () =>
        put({
          type: "CLUSTER.PERMISSIONS.SAVE.ERROR",
          payload: {
            message: api.errorMessage(result, taskLabel),
          },
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER.PERMISSIONS.SAVE.OK",
  });
}

export function* permissionsSave({ key, payload }: SaveAction) {
  const result: ApiResult = yield api.authSafe(
    savePermissions,
    key.clusterName,
    payload,
  );

  if (key.task === "permissionRemove") {
    yield processRemoveResult(result);
  } else if (key.task === "permissionCreate") {
    yield processCreateResult(result);
  }

  // reload
  yield put({
    type: "CLUSTER.PERMISSIONS.LOAD",
    key,
  });
}
