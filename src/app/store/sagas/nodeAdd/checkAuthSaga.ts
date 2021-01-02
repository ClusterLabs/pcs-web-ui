import { checkAuthAgainstNodes } from "app/backend";
import { actionNewId } from "app/store";
import { Action, ActionMap } from "app/store/actions";

import { api, errorMessage, processError, put, race, take } from "../common";

export function* checkAuthSaga({
  payload: { clusterUrlName, nodeName },
}: ActionMap["NODE.ADD.CHECK_AUTH"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof checkAuthAgainstNodes> } = yield race({
    result: api.authSafe(checkAuthAgainstNodes, [nodeName]),
    cancel: take(["NODE.ADD.UPDATE_NODE_NAME", "NODE.ADD.CLOSE"]),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const errorAction = (message: string): Action => ({
    type: "NODE.ADD.CHECK_AUTH.FAIL",
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

  if (result.payload[nodeName] === "Online") {
    yield put({
      type: "NODE.ADD.SEND_KNOWN_HOSTS",
      payload: {
        clusterUrlName,
        nodeName,
      },
    });
    return;
  }

  // result.payload[nodeName] === "Unable to autheticate" => must go through
  // authentication process
  const authProcessId = actionNewId();
  yield put({
    type: "NODE.AUTH.START",
    payload: {
      processId: authProcessId,
      initialNodeList: [nodeName],
    },
  });
  yield put({
    type: "NODE.ADD.CHECK_AUTH.NO_AUTH",
    payload: { clusterUrlName, authProcessId },
  });

  // waiting for authentcation to be successfully done
  while (true) {
    const {
      payload: { response, processId },
    }: ActionMap["NODE.AUTH.OK"] = yield take("NODE.AUTH.OK");
    if (
      processId === authProcessId
      && response.plaintext_error.length === 0
      && !(
        "local_cluster_node_auth_error" in response
        && response.local_cluster_node_auth_error
      )
      && "node_auth_error" in response
      && response.node_auth_error
      && Object.values(response.node_auth_error).every(v => v === 0)
    ) {
      yield put({
        type: "NODE.ADD.SEND_KNOWN_HOSTS",
        payload: {
          clusterUrlName,
          nodeName,
        },
      });
      return;
    }
  }
}
