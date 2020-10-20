import { canAddClusterOrNodes, checkAuthAgainstNodes } from "app/backend";
import { NodeActions } from "app/store/actions";

import { api, put, takeEvery } from "./common";

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

export default [
  takeEvery("NODE.ADD.CHECK_CAN_ADD", checkCanAddNodeSaga),
  takeEvery("NODE.ADD.CHECK_AUTH", checkAuthSaga),
];
