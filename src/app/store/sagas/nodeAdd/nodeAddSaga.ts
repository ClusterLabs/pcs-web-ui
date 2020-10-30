import { Action, NodeActions } from "app/store/actions";

import { api, lib, processError, put } from "../common";

export function* nodeAddSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAdd"]) {
  const result = yield api.authSafe(api.lib.callCluster, {
    clusterUrlName,
    command: "cluster-add-nodes",
    payload: {
      nodes: {
        name: nodeName,
      },
    },
  });

  const taskLabel = `add node ${nodeName}`;
  const errorAction: Action = {
    type: "NODE.ADD.ERROR",
    payload: { clusterUrlName },
  };
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
  }

  yield lib.clusterResponseSwitch(clusterUrlName, taskLabel, result.payload, {
    successAction: {
      type: "NODE.ADD.SUCCESS",
      payload: { clusterUrlName, reports: result.payload.report_list },
    },
    errorAction: {
      type: "NODE.ADD.FAILED",
      payload: { clusterUrlName, reports: result.payload.report_list },
    },
    communicationErrorAction: errorAction,
  });
}
