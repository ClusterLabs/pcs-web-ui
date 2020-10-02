import { LibActions } from "app/store/actions";

import { api, lib, processError, takeEvery } from "./common";

function* callLib({
  payload: { clusterUrlName, call: command, taskLabel },
}: LibActions["ActionLibClusterCall"]) {
  const result: api.ResultOf<typeof api.lib.call> = yield api.authSafe(
    api.lib.callCluster,
    { clusterUrlName, ...command },
  );

  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield lib.clusterResponseProcess(clusterUrlName, taskLabel, result.payload);
}

export default [takeEvery("LIB.CALL.CLUSTER", callLib)];
