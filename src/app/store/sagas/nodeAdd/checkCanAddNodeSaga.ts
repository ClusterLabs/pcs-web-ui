import { canAddClusterOrNodes } from "app/backend";
import { NodeActions } from "app/store/actions";

import { api, errorMessage, processError, put, race, take } from "../common";

export function* checkCanAddNodeSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAddCheckCanAdd"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof canAddClusterOrNodes> } = yield race({
    result: api.authSafe(canAddClusterOrNodes, { nodeNames: [nodeName] }),
    cancel: take(["NODE.ADD.UPDATE_NODE_NAME", "NODE.ADD.CLOSE"]),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "NODE.ADD.CHECK_CAN_ADD.CANNOT",
      payload: {
        clusterUrlName,
        message: result.text,
      },
    });
    return;
  }

  const taskLabel = `add node "${nodeName}": check that node is not in some cluster`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "NODE.ADD.CHECK_CAN_ADD.FAILED",
          payload: {
            clusterUrlName,
            message: errorMessage(result, taskLabel),
          },
        }),
      useNotification: false,
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
