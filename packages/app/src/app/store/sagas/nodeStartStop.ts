import {clusterStart, clusterStop} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, errorMessage, log, processClusterResultBasic, put} from "./common";
import {stripForceText} from "./clusterStopUtils";

export function* nodeStart({payload: {nodeName}}: ActionMap["NODE.START"]) {
  const result: api.ResultOf<typeof clusterStart> = yield api.authSafe(
    clusterStart,
    nodeName,
  );

  yield processClusterResultBasic(`start node "${nodeName}"`, result);
}

export function* nodeStop({
  payload: {nodeName, force},
}: ActionMap["NODE.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    {
      nodeName,
      force,
    },
  );

  const taskLabel = `stop node "${nodeName}"`;

  if (result.type !== "OK") {
    if (result.type !== "BAD_HTTP_STATUS") {
      log.error(result, taskLabel);
    }
    yield put({
      type: "NODE.STOP.FAIL",
      payload: {
        message: errorMessage(stripForceText(result), taskLabel),
        isForceable: "text" in result && result.text.includes("--force"),
      },
    });
    return;
  }

  yield put({type: "CLUSTER.STATUS.REFRESH"});

  yield put({type: "NODE.STOP.OK"});
}
