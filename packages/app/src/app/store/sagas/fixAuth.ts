import {fixAuthOfCluster} from "app/backend";
import {type ActionMap, actionNewId} from "app/store";

import {api, call, put, race, take} from "./common";
import {nodeAuthWait} from "./nodeAuth";

export function* fixAuth({
  payload: {initialNodeList},
}: ActionMap["CLUSTER.FIX_AUTH.START"]) {
  const authProcessId = actionNewId();

  yield put({
    type: "NODE.AUTH.START",
    key: {process: authProcessId},
    payload: {initialNodeList},
  });

  yield put({
    type: "CLUSTER.FIX_AUTH.AUTH_STARTED",
    payload: {authProcessId},
  });

  const {cancel} = yield race({
    auth: call(nodeAuthWait, authProcessId),
    cancel: take("CLUSTER.FIX_AUTH.CANCEL"),
  });

  if (!cancel) {
    yield put({type: "CLUSTER.FIX_AUTH.AUTH_DONE"});
  }

  yield put({
    type: "NODE.AUTH.STOP",
    key: {process: authProcessId},
  });
}

export function* fixAuthDistribute() {
  const {result}: {result: api.ResultOf<typeof fixAuthOfCluster>} = yield race({
    result: api.authSafe(fixAuthOfCluster),
    cancel: take("CLUSTER.FIX_AUTH.CANCEL"),
  });

  if (!result) {
    return;
  }

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "CLUSTER.FIX_AUTH.FAIL",
      payload: {message: result.text},
    });
    return;
  }

  if (result.type !== "OK") {
    const taskLabel = "distribution authentication to cluster";

    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.FIX_AUTH.ERROR",
          payload: {message: api.errorMessage(result, taskLabel)},
        }),
      useNotification: false,
    });
    return;
  }

  yield put({type: "CLUSTER.FIX_AUTH.OK"});
}
