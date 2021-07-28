import { clusterSetup } from "app/backend";
import { Action, ActionMap } from "app/store/actions";
import {
  api,
  lib,
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

  yield lib.dashboardResponseSwitch(taskLabel, result.payload, {
    successAction: {
      type: "DASHBOARD.CLUSTER.SETUP.CALL.OK",
      payload: { reports: result.payload.report_list },
    },
    errorAction: {
      type: "DASHBOARD.CLUSTER.SETUP.CALL.FAIL",
      payload: { reports: result.payload.report_list },
    },
    communicationErrorAction: errorAction,
  });
}
