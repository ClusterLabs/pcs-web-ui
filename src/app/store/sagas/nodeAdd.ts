import { canAddClusterOrNodes, checkAuthAgainstNodes } from "app/backend";
import { Action, NodeActions } from "app/store/actions";

import { api, lib, processError, put, takeEvery } from "./common";

function* checkCanAddNodeSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAddCheckCanAdd"]) {
  const result: api.ResultOf<typeof canAddClusterOrNodes> = yield api.authSafe(
    canAddClusterOrNodes,
    clusterUrlName,
    [nodeName],
  );

  if (result.type !== "OK") {
    put({
      type: "NODE.ADD.CHECK_CAN_ADD.FAILED",
      payload: { clusterUrlName, message: "TODO" },
    });
    return;
  }

  yield put({
    type: "NODE.ADD.CHECK_AUTH",
    payload: {
      clusterUrlName,
      nodeName,
    },
  });
}

function* checkAuthSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAddCheckAuth"]) {
  const result: api.ResultOf<typeof checkAuthAgainstNodes> = yield api.authSafe(
    checkAuthAgainstNodes,
    [nodeName],
  );

  if (result.type !== "OK") {
    put({
      type: "NODE.ADD.CHECK_AUTH.FAILED",
      payload: { clusterUrlName },
    });
    return;
  }
  yield put({
    type: "NODE.ADD.CHECK_AUTH.SUCCESS",
    payload: {
      clusterUrlName,
    },
  });
}

function* nodeAddSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAdd"]) {
  const result = yield api.authSafe(api.lib.callCluster, {
    clusterUrlName,
    command: "cluster-add-nodes",
    payload: {
      nodes: {
        name: nodeName,
      },
    },
  });

  const taskLabel = `add node ${nodeName}`;
  const errorAction: Action = {
    type: "NODE.ADD.ERROR",
    payload: { clusterUrlName },
  };
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
  }

  yield lib.clusterResponseSwitch(clusterUrlName, taskLabel, result.payload, {
    successAction: {
      type: "NODE.ADD.SUCCESS",
      payload: { clusterUrlName, reports: result.payload.report_list },
    },
    errorAction: {
      type: "NODE.ADD.FAILED",
      payload: { clusterUrlName, reports: result.payload.report_list },
    },
    communicationErrorAction: errorAction,
  });
}

export default [
  takeEvery("NODE.ADD.CHECK_CAN_ADD", checkCanAddNodeSaga),
  takeEvery("NODE.ADD.CHECK_AUTH", checkAuthSaga),
  takeEvery("NODE.ADD", nodeAddSaga),
];
