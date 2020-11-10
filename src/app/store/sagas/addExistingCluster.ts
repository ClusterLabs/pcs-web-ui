import {
  authGuiAgainstNodes,
  checkAuthAgainstNodes,
  existingCluster,
} from "app/backend";
import { AddClusterActions } from "app/store/actions";

import { api, put, race, take, takeEvery } from "./common";

function* checkAuthentication({
  payload: { nodeName },
}: AddClusterActions["CheckAuth"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof checkAuthAgainstNodes> } = yield race({
    result: api.authSafe(checkAuthAgainstNodes, [nodeName]),
    cancel: take("ADD_CLUSTER.NODE_NAME.UPDATE"),
  });

  if (!result) {
    return;
  }

  const taskLabel = `check authentication of node"${nodeName}"`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
          payload: { message: api.errorMessage(result, taskLabel) },
        }),
      useNotification: false,
    });
    return;
  }

  const nodeStatus = result.payload[nodeName];
  if (nodeStatus === "Online") {
    yield put({ type: "ADD_CLUSTER.CHECK_AUTH.OK" });
    return;
  }

  if (nodeStatus === "Offline") {
    yield put({
      type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
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
  yield put({ type: "ADD_CLUSTER.CHECK_AUTH.NO_AUTH" });
}

function* addCluster({
  payload: { nodeName },
}: AddClusterActions["AddCluster"]) {
  const result: api.ResultOf<typeof existingCluster> = yield api.authSafe(
    existingCluster,
    nodeName,
  );

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "ADD_CLUSTER.ADD_CLUSTER.ERROR",
      payload: { message: result.text },
    });
    return;
  }

  if (result.type !== "OK") {
    yield put({
      type: "ADD_CLUSTER.ADD_CLUSTER.ERROR",
      payload: {
        message: api.log.errorMessage(
          result,
          `add cluster (node: "${nodeName}")`,
        ),
      },
    });
    return;
  }

  yield put({ type: "ADD_CLUSTER.RELOAD_DASHBOARD" });
  yield put({ type: "DASHBOARD_DATA.REFRESH" });
  yield take("DASHBOARD_DATA.FETCH.SUCCESS");
  yield put({
    type: "ADD_CLUSTER.ADD_CLUSTER.SUCCESS",
    payload: { warningMessages: [] },
  });
}

function* authenticateNode({
  payload: { nodeName, password, address, port },
}: AddClusterActions["AuthenticateNode"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof authGuiAgainstNodes> } = yield race({
    result: api.authSafe(authGuiAgainstNodes, {
      [nodeName]: {
        password,
        dest_list: [{ addr: address, port }],
      },
    }),
    cancel: take("ADD_CLUSTER.NODE_NAME.UPDATE"),
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
          type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
          payload: { message: api.errorMessage(result, taskLabel) },
        }),
      useNotification: false,
    });
    return;
  }

  yield put(
    result.payload.node_auth_error[nodeName] === 0
      ? { type: "ADD_CLUSTER.AUTHENTICATE_NODE.SUCCESS" }
      : {
          type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
          payload: { message: `${taskLabel} failed.` },
        },
  );
}

export default [
  takeEvery("ADD_CLUSTER.CHECK_AUTH", checkAuthentication),
  takeEvery("ADD_CLUSTER.ADD_CLUSTER", addCluster),
  takeEvery("ADD_CLUSTER.AUTHENTICATE_NODE", authenticateNode),
];
