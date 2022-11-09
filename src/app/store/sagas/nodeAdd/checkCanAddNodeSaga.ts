import {canAddClusterOrNodes} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, errorMessage, processError, put, race, take} from "../common";

export function* checkCanAddNodeSaga({
  key,
  payload: {nodeName},
}: ActionMap["NODE.ADD.CHECK_CAN_ADD"]) {
  const {result}: {result: api.ResultOf<typeof canAddClusterOrNodes>} =
    yield race({
      result: api.authSafe(canAddClusterOrNodes, {nodeNames: [nodeName]}),
      cancel: take(["NODE.ADD.UPDATE_NODE_NAME", "NODE.ADD.CLOSE"]),
    });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "NODE.ADD.CHECK_CAN_ADD.CANNOT",
      key,
      payload: {message: result.text},
    });
    return;
  }

  const taskLabel = `add node "${nodeName}": check that node is not in some cluster`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "NODE.ADD.CHECK_CAN_ADD.FAIL",
          key,
          payload: {message: errorMessage(result, taskLabel)},
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "NODE.ADD.CHECK_AUTH",
    key,
    payload: {nodeName},
  });
}
