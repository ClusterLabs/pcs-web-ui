import { fixAuthOfCluster } from "app/backend";
import { ActionMap, actionNewId } from "app/store";

import { api, call, put, race, take, takeEvery } from "./common";
import { nodeAuthWait } from "./nodeAuth";

function* fixAuth({
  id,
  payload: { initialNodeList },
}: ActionMap["CLUSTER.FIX_AUTH.START"]) {
  const authProcessId = actionNewId();

  yield put({
    type: "NODE.AUTH.START",
    id: { process: authProcessId },
    payload: { initialNodeList },
  });

  yield put({
    type: "CLUSTER.FIX_AUTH.AUTH_STARTED",
    id,
    payload: { authProcessId },
  });

  const { cancel } = yield race({
    auth: call(nodeAuthWait, authProcessId),
    cancel: take("CLUSTER.FIX_AUTH.CANCEL"),
  });

  if (!cancel) {
    yield put({
      type: "CLUSTER.FIX_AUTH.AUTH_DONE",
      id,
    });
  }

  yield put({
    type: "NODE.AUTH.STOP",
    id: { process: authProcessId },
  });
}

function* fixAuthDistribute({ id }: ActionMap["CLUSTER.FIX_AUTH.AUTH_DONE"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof fixAuthOfCluster> } = yield race({
    result: api.authSafe(fixAuthOfCluster, id.cluster),
    cancel: take("CLUSTER.FIX_AUTH.CANCEL"),
  });

  if (!result) {
    return;
  }

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "CLUSTER.FIX_AUTH.FAIL",
      id,
      payload: { message: result.text },
    });
    return;
  }

  if (result.type !== "OK") {
    const taskLabel = `distribution authentication to cluster ${id.cluster}`;

    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.FIX_AUTH.ERROR",
          id,
          payload: { message: api.errorMessage(result, taskLabel) },
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "CLUSTER.FIX_AUTH.OK",
    id,
  });
}

export default [
  takeEvery("CLUSTER.FIX_AUTH.START", fixAuth),
  takeEvery("CLUSTER.FIX_AUTH.AUTH_DONE", fixAuthDistribute),
];
