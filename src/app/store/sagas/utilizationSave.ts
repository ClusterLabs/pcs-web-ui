import { setNodeUtilization, setResourceUtilization } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processError, put, putNotification } from "./common";

type SaveAction = ActionMap["CLUSTER.UTILIZATION.SAVE"];

type ApiResult =
  | api.ResultOf<typeof setNodeUtilization>
  | api.ResultOf<typeof setResourceUtilization>;

function* processRemoveResult(result: ApiResult) {
  if (result.type !== "OK") {
    yield processError(result, "remove utilization attribute");
    return;
  }
  yield putNotification("SUCCESS", "Utilization attribute removed");
}

function* processEditResult(result: ApiResult) {
  const taskLabel = "edit utilization attribute";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      useNotification: false,
      action: () =>
        put({
          type: "CLUSTER.UTILIZATION.SAVE.ERROR",
          payload: {
            message: api.errorMessage(result, taskLabel),
          },
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER.UTILIZATION.SAVE.OK",
  });
}

export function* utilizationSave({
  key,
  payload: { name, value, owner },
}: SaveAction) {
  let result: ApiResult;

  if (owner.type === "resource") {
    result = yield api.authSafe(setResourceUtilization, {
      clusterName: key.clusterName,
      resourceId: owner.id,
      name,
      value,
    });
  } else {
    result = yield api.authSafe(setNodeUtilization, {
      clusterName: key.clusterName,
      nodeName: owner.id,
      name,
      value,
    });
  }

  if (value.length === 0) {
    yield processRemoveResult(result);
    yield put({ type: "CLUSTER.UTILIZATION.EDIT.CLOSE", key });
  } else {
    yield processEditResult(result);
  }

  yield put({ type: "CLUSTER.STATUS.REFRESH", key });
}
