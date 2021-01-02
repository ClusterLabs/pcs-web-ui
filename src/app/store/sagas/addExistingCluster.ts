import { checkAuthAgainstNodes, existingCluster } from "app/backend";
import { ActionMap, actionNewId } from "app/store";

import { nodeAuthWait } from "./nodeAuth";
import { api, call, put, race, take, takeEvery } from "./common";

function* checkAuthentication({
  payload: { nodeName },
}: ActionMap["CLUSTER.ADD.CHECK_AUTH"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof checkAuthAgainstNodes> } = yield race({
    result: api.authSafe(checkAuthAgainstNodes, [nodeName]),
    cancel: take("CLUSTER.ADD.NODE_NAME.UPDATE"),
  });

  if (!result) {
    return;
  }

  const taskLabel = `check authentication of node"${nodeName}"`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.ADD.CHECK_AUTH.ERROR",
          payload: { message: api.errorMessage(result, taskLabel) },
        }),
      useNotification: false,
    });
    return;
  }

  const nodeStatus = result.payload[nodeName];
  if (nodeStatus === "Online") {
    yield put({ type: "CLUSTER.ADD.CHECK_AUTH.OK" });
    return;
  }

  if (nodeStatus === "Offline") {
    yield put({
      type: "CLUSTER.ADD.CHECK_AUTH.ERROR",
      payload: {
        // prettier-ignore
        message: (
          `Cannot connect to the node '${nodeName}'. Is the node online?`
        ),
      },
    });
    return;
  }

  // Unable to authenticate
  const authProcessId = actionNewId();
  yield put({
    type: "NODE.AUTH.START",
    payload: {
      processId: authProcessId,
      initialNodeList: [nodeName],
    },
  });
  yield put({
    type: "CLUSTER.ADD.CHECK_AUTH.NO_AUTH",
    payload: { authProcessId },
  });
  yield call(nodeAuthWait, authProcessId);
  yield put({ type: "CLUSTER.ADD.CHECK_AUTH.OK" });
}

function* addCluster({ payload: { nodeName } }: ActionMap["CLUSTER.ADD"]) {
  const result: api.ResultOf<typeof existingCluster> = yield api.authSafe(
    existingCluster,
    nodeName,
  );

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "CLUSTER.ADD.ERROR",
      payload: { message: result.text },
    });
    return;
  }

  if (result.type !== "OK") {
    yield put({
      type: "CLUSTER.ADD.ERROR",
      payload: {
        message: api.log.errorMessage(
          result,
          `add cluster (node: "${nodeName}")`,
        ),
      },
    });
    return;
  }

  yield put({ type: "CLUSTER.LIST.REFRESH" });
  yield take("CLUSTER.LIST.FETCH.OK");
  yield put({
    type: "CLUSTER.ADD.OK",
    payload: { warningMessages: [] },
  });
}

export default [
  takeEvery("CLUSTER.ADD.CHECK_AUTH", checkAuthentication),
  takeEvery("CLUSTER.ADD", addCluster),
];
