import {
  authGuiAgainstNodes,
  checkAuthAgainstNodes,
  existingCluster,
} from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, put, race, take, takeEvery } from "./common";

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
  yield put({ type: "CLUSTER.ADD.CHECK_AUTH.NO_AUTH" });
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

function* authenticateNode({
  payload: { nodeName, password, address, port },
}: ActionMap["CLUSTER.ADD.AUTH_NODE"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof authGuiAgainstNodes> } = yield race({
    result: api.authSafe(authGuiAgainstNodes, {
      [nodeName]: {
        password,
        dest_list: [{ addr: address, port }],
      },
    }),
    cancel: take("CLUSTER.ADD.NODE_NAME.UPDATE"),
  });

  if (!result) {
    // node name changed;  we no longer care about the fate of the call
    return;
  }

  const taskLabel = `authenticate node "${nodeName}"`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.ADD.AUTH_NODE.ERROR",
          payload: { message: api.errorMessage(result, taskLabel) },
        }),
      useNotification: false,
    });
    return;
  }

  yield put(
    result.payload.node_auth_error[nodeName] === 0
      ? { type: "CLUSTER.ADD.AUTH_NODE.OK" }
      : {
          type: "CLUSTER.ADD.AUTH_NODE.ERROR",
          payload: { message: `${taskLabel} failed.` },
        },
  );
}

export default [
  takeEvery("CLUSTER.ADD.CHECK_AUTH", checkAuthentication),
  takeEvery("CLUSTER.ADD", addCluster),
  takeEvery("CLUSTER.ADD.AUTH_NODE", authenticateNode),
];
