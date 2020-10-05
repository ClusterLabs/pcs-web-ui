import { NodeActions } from "app/store/actions";
import { clusterStart, clusterStop } from "app/backend";

import { api, processError, put, putNotification, takeEvery } from "./common";

function* nodeStart({
  payload: { nodeName, clusterUrlName },
}: NodeActions["StartNode"]) {
  const result: api.ResultOf<typeof clusterStart> = yield api.authSafe(
    clusterStart,
    clusterUrlName,
    nodeName,
  );

  const taskLabel = `start node ${nodeName}"`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield put({
    type: "CLUSTER_DATA.REFRESH",
    payload: { clusterUrlName },
  });
  yield putNotification("SUCCESS", `Succesfully done: ${taskLabel}`);
}

function* nodeStop({
  payload: { nodeName, clusterUrlName },
}: NodeActions["StopNode"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    clusterUrlName,
    nodeName,
  );

  const taskLabel = `stop node ${nodeName}"`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield put({
    type: "CLUSTER_DATA.REFRESH",
    payload: { clusterUrlName },
  });
  yield putNotification("SUCCESS", `Succesfully done: ${taskLabel}`);
}

export default [
  takeEvery("NODE.START", nodeStart),
  takeEvery("NODE.STOP", nodeStop),
];
