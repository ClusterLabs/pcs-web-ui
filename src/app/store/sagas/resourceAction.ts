import { PrimitiveResourceActions } from "app/store/actions";
import {
  resourceDisable,
  resourceEnable,
  resourceManage,
  resourceUnmanage,
} from "app/backend";

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

function resourceAction(callLib: api.Call<api.LibPayload>, taskName: string) {
  return function* resourceActionSaga({
    payload: { resourceNameList, clusterUrlName },
  }: Action) {
    const result: api.ResultOf<typeof callLib> = yield api.authSafe(callLib, {
      clusterUrlName,
      resourceNameList,
    });

    const taskLabel = `${taskName} ${formatResourcesMsg(resourceNameList)}`;

    if (result.type !== "OK") {
      yield processError(result, taskLabel);
      return;
    }

    yield lib.processResponse({
      taskLabel,
      clusterUrlName,
      response: result.payload,
    });
  };
}

export default [
  takeEvery(
    "RESOURCE.PRIMITIVE.DISABLE",
    resourceAction(resourceDisable, "disable"),
  ),
  takeEvery(
    "RESOURCE.PRIMITIVE.ENABLE",
    resourceAction(resourceEnable, "enable"),
  ),
  takeEvery(
    "RESOURCE.PRIMITIVE.UNMANAGE",
    resourceAction(resourceUnmanage, "unmanage"),
  ),
  takeEvery(
    "RESOURCE.PRIMITIVE.MANAGE",
    resourceAction(resourceManage, "manage"),
  ),
];
