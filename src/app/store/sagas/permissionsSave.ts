import {savePermissions} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, processError, put, putNotification} from "./common";

type SaveAction = ActionMap["CLUSTER.PERMISSIONS.SAVE"];
type ApiResult = api.ResultOf<typeof savePermissions>;

function* processRemoveResult(result: ApiResult) {
  if (result.type !== "OK") {
    yield processError(
      result,
      "remove permission",
      undefined,
      "permission-remove",
    );
    return;
  }
  yield putNotification(
    "SUCCESS",
    "Permission removed",
    undefined,
    "permission-remove",
  );
}

function* processEditResult(result: ApiResult) {
  const taskLabel = "edit permission";
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

export function* permissionsSave({key, payload: {permissionList}}: SaveAction) {
  const result: ApiResult = yield api.authSafe(
    savePermissions,
    key.clusterName,
    permissionList,
  );

  if (key.task === "permissionRemove") {
    yield processRemoveResult(result);
  } else {
    yield processEditResult(result);
  }

  // reload
  yield put({
    type: "CLUSTER.PERMISSIONS.LOAD",
    key,
  });
}
