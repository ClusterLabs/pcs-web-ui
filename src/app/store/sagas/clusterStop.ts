import { clusterStop } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, errorMessage, log, put } from "./common";

export function* clusterStopSaga({
  payload: { clusterName, force },
}: ActionMap["DASHBOARD.CLUSTER.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    { clusterName, force },
  );

  const taskLabel = `Stop cluster "${clusterName}"`;

  if (result.type !== "OK") {
    if (result.type !== "BAD_HTTP_STATUS") {
      log.error(result, taskLabel);
    }
    yield put({
      type: "TASK.FORCEABLE-CONFIRM.FAIL",
      payload: { message: errorMessage(result, taskLabel) },
    });
    return;
  }
  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    key: { clusterName },
  });
  yield put({
    type: "TASK.FORCEABLE-CONFIRM.OK",
  });
}
