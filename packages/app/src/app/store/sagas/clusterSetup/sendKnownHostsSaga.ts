import {sendKnownHostsToNode} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, errorMessage, processError, put, race, take} from "../common";

export function* sendKnownHostsToNodeSaga({
  payload: {nodeNameList, targetNode},
}: ActionMap["DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS"]) {
  const {result}: {result: api.ResultOf<typeof sendKnownHostsToNode>} =
    yield race({
      result: api.authSafe(sendKnownHostsToNode, {targetNode, nodeNameList}),
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

  const taskLabel =
    "cluster setup: sending updated known host to the  setup coordinating node";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.FAIL",
          payload: {message: errorMessage(result, taskLabel)},
        }),
      useNotification: false,
    });
    return;
  }
  yield put({
    type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.OK",
  });
}
