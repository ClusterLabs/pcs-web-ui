import { libCallCluster } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, lib, processError } from "./common";

export function* callLib({
  key,
  payload: { call: command, taskLabel },
}: ActionMap["LIB.CALL.CLUSTER"]) {
  const result: api.ResultOf<typeof libCallCluster> = yield api.authSafe(
    libCallCluster,
    { clusterName: key.clusterName, ...command },
  );

  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield lib.clusterResponseProcess(key.clusterName, taskLabel, result.payload);
}
