import { fixAuthOfCluster } from "app/backend";
import { ActionMap, actionNewId } from "app/store";

import { api, call, put, race, take } from "./common";
import { nodeAuthWait } from "./nodeAuth";

export function* fixAuth({
  key,
  payload: { initialNodeList },
}: ActionMap["CLUSTER.FIX_AUTH.START"]) {
  const authProcessId = actionNewId();

  yield put({
    type: "NODE.AUTH.START",
    key: { process: authProcessId },
    payload: { initialNodeList },
  });

  yield put({
    type: "CLUSTER.FIX_AUTH.AUTH_STARTED",
    key,
    payload: { authProcessId },
  });

  const { cancel } = yield race({
    auth: call(nodeAuthWait, authProcessId),
    cancel: take("CLUSTER.FIX_AUTH.CANCEL"),
  });

  if (!cancel) {
    yield put({
      type: "CLUSTER.FIX_AUTH.AUTH_DONE",
      key,
    });
  }

  yield put({
    type: "NODE.AUTH.STOP",
    key: { process: authProcessId },
  });
}

export function* fixAuthDistribute({
  key,
}: ActionMap["CLUSTER.FIX_AUTH.AUTH_DONE"]) {
  const { result }: { result: api.ResultOf<typeof fixAuthOfCluster> } =
    yield race({
      result: api.authSafe(fixAuthOfCluster, key.clusterName),
      cancel: take("CLUSTER.FIX_AUTH.CANCEL"),
    });

  if (!result) {
    return;
  }

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "CLUSTER.FIX_AUTH.FAIL",
      key,
      payload: { message: result.text },
    });
    return;
  }

  if (result.type !== "OK") {
    const taskLabel = `distribution authentication to cluster ${key.clusterName}`;

    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.FIX_AUTH.ERROR",
          key,
          payload: { message: api.errorMessage(result, taskLabel) },
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "CLUSTER.FIX_AUTH.OK",
    key,
  });
}
