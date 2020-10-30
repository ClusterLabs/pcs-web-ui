import { canAddClusterOrNodes } from "app/backend";
import { Action, NodeActions } from "app/store/actions";

import { api, errorMessage, processError, put } from "../common";

export function* checkCanAddNodeSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAddCheckCanAdd"]) {
  const result: api.ResultOf<typeof canAddClusterOrNodes> = yield api.authSafe(
    canAddClusterOrNodes,
    { nodeNames: [nodeName] },
  );

  const errorAction = (message: string): Action => ({
    type: "NODE.ADD.CHECK_CAN_ADD.FAILED",
    payload: { clusterUrlName, message },
  });

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put(errorAction(result.text));
    return;
  }

  const taskLabel = `add node "${nodeName}": node not in a known cluster check`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction(errorMessage(result, taskLabel))),
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
