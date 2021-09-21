import { clusterSetup } from "app/backend";
import { Action, ActionMap } from "app/store/actions";
import {
  api,
  lib,
  log,
  processError,
  put,
  race,
  take,
} from "app/store/sagas/common";

export function* setup({
  payload: { targetNode, setupData },
}: ActionMap["DASHBOARD.CLUSTER.SETUP.CALL"]) {
  const { result }: { result: api.ResultOf<typeof clusterSetup> } = yield race({
    result: api.authSafe(clusterSetup, {
      targetNode,
      setupData,
    }),
    cancel: take("DASHBOARD.CLUSTER.SETUP.CALL.CANCEL"),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const errorAction: Action = {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.ERROR",
  };

  const taskLabel = "cluster setup: create cluster";
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
      type: "DASHBOARD.CLUSTER.SETUP.CALL.FAIL",
      payload: { reports: payload.report_list },
    });
    return;
  }

  yield put({ type: "CLUSTER.LIST.REFRESH" });
  yield put({
    type: "DASHBOARD.CLUSTER.SETUP.CALL.OK",
    payload: { reports: payload.report_list },
  });
}
