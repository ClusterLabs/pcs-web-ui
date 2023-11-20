import {clusterStop} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, errorMessage, log, put} from "./common";
import {stripForceText} from "./clusterStopUtils";

export function* clusterStopSaga({
  payload: {clusterName, force},
}: ActionMap["CLUSTER.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    {clusterName, force},
  );

  const taskLabel = `Stop cluster "${clusterName}"`;

  if (result.type !== "OK") {
    if (result.type !== "BAD_HTTP_STATUS") {
      log.error(result, taskLabel);
    }
    yield put({
      type: "CLUSTER.STOP.FAIL",
      payload: {
        message: errorMessage(stripForceText(result), taskLabel),
        isForceable: "text" in result && result.text.includes("--force"),
      },
    });
    return;
  }
  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    key: {clusterName},
  });
  yield put({
    type: "CLUSTER.STOP.OK",
  });
}
