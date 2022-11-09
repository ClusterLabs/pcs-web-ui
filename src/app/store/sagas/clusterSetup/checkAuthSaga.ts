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

export function* checkAuthSaga({
  payload: {nodeNameList, targetNode},
}: ActionMap["DASHBOARD.CLUSTER.SETUP.CHECK_AUTH"]) {
  const {result}: {result: api.ResultOf<typeof checkAuthAgainstNodes>} =
    yield race({
      result: api.authSafe(checkAuthAgainstNodes, nodeNameList),
      cancel: take([
        "DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME",
        "DASHBOARD.CLUSTER.SETUP.UPDATE_NODES",
        "DASHBOARD.CLUSTER.SETUP.CLOSE",
      ]),
    });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const errorAction = (message: string): Action => ({
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.FAIL",
    payload: {message},
  });
  const taskLabel = "cluster setup: nodes authentication check";

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction(errorMessage(result, taskLabel))),
      useNotification: false,
    });
    return;
  }

  if (
    Object.keys(result.payload).some(
      nodeName => result.payload[nodeName] === "Offline",
    )
  ) {
    const offlineNodeNames = Object.keys(result.payload)
      .filter(nodeName => result.payload[nodeName] === "Offline")
      .join(", ");

    yield put(
      errorAction(
        `Task ${taskLabel}: some nodes (${offlineNodeNames}) seems to be offline`,
      ),
    );
    return;
  }

  if (
    Object.keys(result.payload).every(
      nodeName => result.payload[nodeName] === "Online",
    )
  ) {
    yield put({
      type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS",
      payload: {nodeNameList, targetNode},
    });
    return;
  }

  // result.payload[nodeName] === "Unable to autheticate" => must go through
  // authentication process
  const authProcessId = actionNewId();
  yield put({
    type: "NODE.AUTH.START",
    key: {process: authProcessId},
    payload: {
      initialNodeList: Object.keys(result.payload).filter(
        nodeName => result.payload[nodeName] === "Unable to authenticate",
      ),
    },
  });

  yield put({
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.NO_AUTH",
    payload: {authProcessId},
  });

  const {cancel} = yield race({
    auth: call(nodeAuthWait, authProcessId),
    cancel: take([
      "DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME",
      "DASHBOARD.CLUSTER.SETUP.UPDATE_NODES",
      "DASHBOARD.CLUSTER.SETUP.CLOSE",
    ]),
  });

  if (!cancel) {
    yield put({
      type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS",
      payload: {nodeNameList, targetNode},
    });
    return;
  }
  yield put({
    type: "NODE.AUTH.STOP",
    key: {process: authProcessId},
  });
}
