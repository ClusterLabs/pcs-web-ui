import { libCallCluster } from "app/backend";
import { Action, ActionMap } from "app/store/actions";

import { api, lib, log, processError, put, race, take } from "./common";

export function* callLib({
  key,
  payload: { call: command, taskLabel },
}: ActionMap["LIB.CALL.CLUSTER.TASK"]) {
  const { result }: { result: api.ResultOf<typeof libCallCluster> } =
    yield race({
      result: api.authSafe(libCallCluster, {
        clusterName: key.clusterName,
        command,
      }),
      cancel: take("LIB.CALL.CLUSTER.TASK.CANCEL"),
    });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const errorAction: Action = {
    type: "LIB.CALL.CLUSTER.TASK.ERROR",
    key,
  };

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
    return;
  }

  const { payload } = result;

  if (lib.isCommunicationError(payload)) {
    log.libInputError(payload.status, payload.status_msg, taskLabel);
    yield put(errorAction);
    return;
  }

  if (payload.status === "error") {
    yield put({
      type: "LIB.CALL.CLUSTER.TASK.FAIL",
      key,
      payload: { reports: payload.report_list },
    });
    return;
  }

  yield put({ type: "CLUSTER.STATUS.REFRESH", key });
  yield put({
    type: "LIB.CALL.CLUSTER.TASK.OK",
    key,
    payload: { reports: payload.report_list },
  });
}
