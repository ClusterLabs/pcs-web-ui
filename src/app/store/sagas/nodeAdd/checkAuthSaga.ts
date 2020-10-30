import { checkAuthAgainstNodes } from "app/backend";
import { Action, NodeActions } from "app/store/actions";

import { api, errorMessage, processError, put } from "../common";

export function* checkAuthSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAddCheckAuth"]) {
  const result: api.ResultOf<typeof checkAuthAgainstNodes> = yield api.authSafe(
    checkAuthAgainstNodes,
    [nodeName],
  );

  const errorAction = (message: string): Action => ({
    type: "NODE.ADD.CHECK_AUTH.FAILED",
    payload: { clusterUrlName, message },
  });
  const taskLabel = `add node "${nodeName}": node authentication check`;

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction(errorMessage(result, taskLabel))),
      useNotification: false,
    });
    return;
  }

  if (result.payload[nodeName] === "Offline") {
    yield put(errorAction(`Task ${taskLabel}: node seems to be offline`));
    return;
  }

  if (result.payload[nodeName] === "Unable to authenticate") {
    yield put({
      type: "NODE.ADD.CHECK_AUTH.NO_AUTH",
      payload: { clusterUrlName },
    });
    return;
  }

  yield put({
    type: "NODE.ADD.SEND_KNOWN_HOSTS",
    payload: {
      clusterUrlName,
      nodeName,
    },
  });
}
