import {canAddClusterOrNodes} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, errorMessage, processError, put, race, take} from "../common";

export function* checkCanAddNodeSaga({
  payload: {clusterName, nodeNameList, targetNode},
}: ActionMap["DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD"]) {
  const {result}: {result: api.ResultOf<typeof canAddClusterOrNodes>} =
    yield race({
      result: api.authSafe(canAddClusterOrNodes, {
        nodeNames: nodeNameList,
        clusterName,
      }),
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

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.CANNOT",
      payload: {errors: result.text.split("\n")},
    });
    return;
  }

  const taskLabel =
    "cluster setup: check that the cluster can be created from the nodes";

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.FAIL",
          payload: {message: errorMessage(result, taskLabel)},
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH",
    payload: {nodeNameList, targetNode},
  });
}
