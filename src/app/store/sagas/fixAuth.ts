import { fixAuthOfCluster } from "app/backend";
import { ActionMap, actionNewId } from "app/store";

import { api, call, put, race, take, takeEvery } from "./common";
import { nodeAuthWait } from "./nodeAuth";

function* fixAuth({
  payload: { initialNodeList, clusterUrlName },
}: ActionMap["CLUSTER.FIX_AUTH.START"]) {
  const authProcessId = actionNewId();

  yield put({
    type: "NODE.AUTH.START",
    payload: {
      processId: authProcessId,
      initialNodeList,
    },
  });

  yield put({
    type: "CLUSTER.FIX_AUTH.AUTH_STARTED",
    payload: { clusterUrlName, authProcessId },
  });

  const { cancel } = yield race({
    auth: call(nodeAuthWait, authProcessId),
    cancel: take("CLUSTER.FIX_AUTH.CANCEL"),
  });

  if (!cancel) {
    yield put({
      type: "CLUSTER.FIX_AUTH.AUTH_DONE",
      payload: { clusterUrlName },
    });
  }

  yield put({
    type: "NODE.AUTH.STOP",
    payload: { processId: authProcessId },
  });
}

function* fixAuthDistribute({
  payload: { clusterUrlName },
}: ActionMap["CLUSTER.FIX_AUTH.AUTH_DONE"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof fixAuthOfCluster> } = yield race({
    result: api.authSafe(fixAuthOfCluster, clusterUrlName),
    cancel: take("CLUSTER.FIX_AUTH.CANCEL"),
  });

  if (!result) {
    return;
  }

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "CLUSTER.FIX_AUTH.FAIL",
      payload: { clusterUrlName, message: result.text },
    });
    return;
  }

  if (result.type !== "OK") {
    const taskLabel = `distribution authentication to cluster ${clusterUrlName}`;

    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.FIX_AUTH.ERROR",
          payload: {
            clusterUrlName,
            message: api.errorMessage(
              result,
              `distribution authentication to cluster ${clusterUrlName}`,
            ),
          },
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "CLUSTER.FIX_AUTH.OK",
    payload: { clusterUrlName },
  });
}

export default [
  takeEvery("CLUSTER.FIX_AUTH.START", fixAuth),
  takeEvery("CLUSTER.FIX_AUTH.AUTH_DONE", fixAuthDistribute),
];
