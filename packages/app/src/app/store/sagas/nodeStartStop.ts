import {clusterStart, clusterStop} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, errorMessage, log, processClusterResultBasic, put} from "./common";
import {stripForceText} from "./clusterStopUtils";

export function* nodeStart({
  key,
  payload: {nodeName},
}: ActionMap["NODE.START"]) {
  const result: api.ResultOf<typeof clusterStart> = yield api.authSafe(
    clusterStart,
    key.clusterName,
    nodeName,
  );

  yield processClusterResultBasic(
    key.clusterName,
    `start node "${nodeName}"`,
    result,
  );
}

export function* nodeStop({
  key,
  payload: {nodeName, force},
}: ActionMap["NODE.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    {
      clusterName: key.clusterName,
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
      key: {clusterName: key.clusterName},
      payload: {
        message: errorMessage(stripForceText(result), taskLabel),
        isForceable: "text" in result && result.text.includes("--force"),
      },
    });
    return;
  }

  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    key: {clusterName: key.clusterName},
  });

  yield put({
    type: "NODE.STOP.OK",
    key: {clusterName: key.clusterName},
  });
}
