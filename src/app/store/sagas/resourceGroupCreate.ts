import { libCallCluster } from "app/backend";
import { Action, ActionMap } from "app/store";

import { api, lib, processError, put, race, take } from "./common";

export function* create({
  key,
  payload: { groupId, resourceIdList },
}: ActionMap["RESOURCE.GROUP.CREATE"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof libCallCluster> } = yield race({
    result: api.authSafe(libCallCluster, {
      clusterName: key.clusterName,
      command: "resource-group-add",
      payload: {
        group_id: groupId,
        resource_id_list: resourceIdList,
      },
    }),
    cancel: take("RESOURCE.CREATE.CLOSE"),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const taskLabel = `create resource group "${groupId}"`;
  const errorAction: Action = {
    type: "RESOURCE.GROUP.CREATE.ERROR",
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
      type: "RESOURCE.GROUP.CREATE.SUCCESS",
      key,
      payload: { reports: result.payload.report_list },
    },
    errorAction: {
      type: "RESOURCE.GROUP.CREATE.FAIL",
      key,
      payload: { reports: result.payload.report_list },
    },
    communicationErrorAction: errorAction,
  });
}
