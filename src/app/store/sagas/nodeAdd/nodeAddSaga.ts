import { libCallCluster } from "app/backend";
import { Action, ActionMap } from "app/store/actions";

import { api, lib, processError, put, race, take } from "../common";

export function* nodeAddSaga({
  key: { clusterName },
  payload: {
    nodeName,
    nodeAddresses,
    sbdWatchdog,
    sbdNoWatchdogValidation,
    sbdDevices,
  },
}: ActionMap["NODE.ADD"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof libCallCluster> } = yield race({
    result: api.authSafe(libCallCluster, {
      clusterName,
      command: {
        name: "cluster-add-nodes",
        payload: {
          nodes: [
            {
              name: nodeName,
              ...(nodeAddresses.length > 0 ? { addrs: nodeAddresses } : {}),
              ...(sbdDevices.length > 0 ? { devices: sbdDevices } : {}),
              ...(sbdWatchdog.length > 0 ? { watchdog: sbdWatchdog } : {}),
            },
          ],
          no_watchdog_validation: sbdNoWatchdogValidation,
        },
      },
    }),
    cancel: take("NODE.ADD.CLOSE"),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const key = { clusterName, task: "nodeAdd" };
  const taskLabel = `add node ${nodeName}`;
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

  yield lib.clusterResponseSwitch(key.clusterName, taskLabel, result.payload, {
    successAction: {
      type: "LIB.CALL.CLUSTER.TASK.OK",
      key,
      payload: { reports: result.payload.report_list },
    },
    errorAction: {
      type: "LIB.CALL.CLUSTER.TASK.FAIL",
      key,
      payload: { reports: result.payload.report_list },
    },
    communicationErrorAction: errorAction,
  });
}
