import { PrimitiveResourceActions } from "app/store/actions";

import {
  api,
  formatResourcesMsg,
  lib,
  processError,
  takeEvery,
} from "./common";

type Action =
  | PrimitiveResourceActions["ActionUnmanage"]
  | PrimitiveResourceActions["ActionManage"]
  | PrimitiveResourceActions["ActionDisable"]
  | PrimitiveResourceActions["ActionEnable"];

function resourceAction(
  command:
    | "resource-disable"
    | "resource-enable"
    | "resource-manage"
    | "resource-unmanage",
  taskName: string,
) {
  return function* resourceActionSaga({
    payload: { resourceNameList, clusterUrlName },
  }: Action) {
    const result: api.ResultOf<typeof api.lib.call> = yield api.authSafe(
      api.lib.callCluster,
      {
        clusterUrlName,
        command,
        payload: { resource_or_tag_ids: resourceNameList },
      },
    );

    const taskLabel = `${taskName} ${formatResourcesMsg(resourceNameList)}`;

    if (result.type !== "OK") {
      yield processError(result, taskLabel);
      return;
    }

    yield lib.clusterResponseProcess(clusterUrlName, taskLabel, result.payload);
  };
}

export default [
  takeEvery(
    "RESOURCE.PRIMITIVE.DISABLE",
    resourceAction("resource-disable", "disable"),
  ),
  takeEvery(
    "RESOURCE.PRIMITIVE.ENABLE",
    resourceAction("resource-enable", "enable"),
  ),
  takeEvery(
    "RESOURCE.PRIMITIVE.UNMANAGE",
    resourceAction("resource-unmanage", "unmanage"),
  ),
  takeEvery(
    "RESOURCE.PRIMITIVE.MANAGE",
    resourceAction("resource-manage", "manage"),
  ),
];
