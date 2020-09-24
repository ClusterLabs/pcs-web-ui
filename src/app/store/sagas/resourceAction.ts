import { PrimitiveResourceActions } from "app/store/actions";
import {
  api,
  resourceDisable,
  resourceEnable,
  resourceManage,
  resourceUnmanage,
} from "app/backend";

import { takeEvery } from "./effects";
import { callAuthSafe } from "./authSafe";
import { formatResourcesMsg, processLibraryResponse } from "./lib";
import { callError } from "./backendTools";

type Actions =
  | PrimitiveResourceActions["ActionUnmanage"]
  | PrimitiveResourceActions["ActionManage"]
  | PrimitiveResourceActions["ActionDisable"]
  | PrimitiveResourceActions["ActionEnable"];

function resourceAction(callLib: api.Call<api.LibPayload>, taskName: string) {
  return function* resourceActionSaga({
    payload: { resourceNameList, clusterUrlName },
  }: Actions) {
    const result: api.ResultOf<typeof callLib> = yield callAuthSafe(callLib, {
      clusterUrlName,
      resourceNameList,
    });

    const taskLabel = `${taskName} ${formatResourcesMsg(resourceNameList)}`;

    if (result.type !== "OK") {
      yield callError(result, taskLabel);
      return;
    }

    yield processLibraryResponse({
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
