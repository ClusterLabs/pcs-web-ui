import {checkAuthAgainstNodes} from "app/backend";
import {actionNewId} from "app/store";
import {Action, ActionMap} from "app/store/actions";

import {
  api,
  call,
  errorMessage,
  processError,
  put,
  race,
  take,
} from "../common";
import {nodeAuthWait} from "../nodeAuth";

const cancelActions: (keyof ActionMap)[] = [
  "DASHBOARD.CLUSTER.IMPORT.UPDATE_NODE",
  "DASHBOARD.CLUSTER.IMPORT.CLOSE",
];

const checkAuthOkAction: Action = {
  type: "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.OK",
};

export function* checkAuth({
  payload: {nodeName},
}: ActionMap["DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH"]) {
  const {result}: {result: api.ResultOf<typeof checkAuthAgainstNodes>} =
    yield race({
      result: api.authSafe(checkAuthAgainstNodes, [nodeName]),
      cancel: take(cancelActions),
    });

  if (!result) {
    return;
  }

  const errorAction = (message: string): Action => ({
    type: "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.FAIL",
    payload: {message},
  });
  const taskLabel = "add existing cluster: node authentication check";

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction(errorMessage(result, taskLabel))),
      useNotification: false,
    });
    return;
  }

  const nodeStatus = result.payload[nodeName];

  if (nodeStatus === "Offline") {
    yield put(
      errorAction(`Task ${taskLabel}: node "${nodeName}" seems to be offline`),
    );
    return;
  }

  if (nodeStatus === "Online") {
    yield put(checkAuthOkAction);
    return;
  }

  // result.payload[nodeName] === "Unable to autheticate" => must go through
  // authentication process
  const authProcessId = actionNewId();
  yield put({
    type: "NODE.AUTH.START",
    key: {process: authProcessId},
    payload: {initialNodeList: [nodeName]},
  });

  yield put({
    type: "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.NO_AUTH",
    payload: {authProcessId},
  });

  const {cancel} = yield race({
    auth: call(nodeAuthWait, authProcessId),
    cancel: take(cancelActions),
  });

  if (!cancel) {
    yield put(checkAuthOkAction);
    return;
  }
  yield put({
    type: "NODE.AUTH.STOP",
    key: {process: authProcessId},
  });
}
