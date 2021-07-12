import { checkAuthAgainstNodes } from "app/backend";
import { actionNewId } from "app/store";
import { Action, ActionMap } from "app/store/actions";

import {
  api,
  call,
  errorMessage,
  processError,
  put,
  race,
  take,
} from "../common";
import { nodeAuthWait } from "../nodeAuth";

export function* checkAuthSaga({
  key,
  payload: { nodeName },
}: ActionMap["NODE.ADD.CHECK_AUTH"]) {
  const { result }: { result: api.ResultOf<typeof checkAuthAgainstNodes> } =
    yield race({
      result: api.authSafe(checkAuthAgainstNodes, [nodeName]),
      cancel: take(["NODE.ADD.UPDATE_NODE_NAME", "NODE.ADD.CLOSE"]),
    });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const errorAction = (message: string): Action => ({
    type: "NODE.ADD.CHECK_AUTH.FAIL",
    key,
    payload: { message },
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

  if (result.payload[nodeName] === "Online") {
    yield put({
      type: "NODE.ADD.SEND_KNOWN_HOSTS",
      key,
      payload: { nodeName },
    });
    return;
  }

  // result.payload[nodeName] === "Unable to autheticate" => must go through
  // authentication process
  const authProcessId = actionNewId();
  yield put({
    type: "NODE.AUTH.START",
    key: { process: authProcessId },
    payload: { initialNodeList: [nodeName] },
  });
  yield put({
    type: "NODE.ADD.CHECK_AUTH.NO_AUTH",
    key,
    payload: { authProcessId },
  });

  const { cancel } = yield race({
    auth: call(nodeAuthWait, authProcessId),
    cancel: take(["NODE.ADD.UPDATE_NODE_NAME", "NODE.ADD.CLOSE"]),
  });

  if (!cancel) {
    yield put({
      type: "NODE.ADD.SEND_KNOWN_HOSTS",
      key,
      payload: { nodeName },
    });
    return;
  }
  yield put({
    type: "NODE.AUTH.STOP",
    key: { process: authProcessId },
  });
}
