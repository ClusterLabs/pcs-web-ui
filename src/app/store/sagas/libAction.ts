import { ActionMap } from "app/store/actions";

import { api, lib, processError, takeEvery } from "./common";

function* callLib({
  key,
  payload: { call: command, taskLabel },
}: ActionMap["LIB.CALL.CLUSTER"]) {
  const result: api.ResultOf<typeof api.lib.call> = yield api.authSafe(
    api.lib.callCluster,
    { clusterName: key.clusterName, ...command },
  );

  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield lib.clusterResponseProcess(key.clusterName, taskLabel, result.payload);
}

export default [takeEvery("LIB.CALL.CLUSTER", callLib)];
