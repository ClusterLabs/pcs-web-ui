import {clusterStart} from "app/backend";

import {api, put, putNotification} from "./common";

export function* clusterStartSaga() {
  const result: api.ResultOf<typeof clusterStart> =
    yield api.authSafe(clusterStart);

  if (result.type !== "OK") {
    yield putNotification("ERROR", "Cluster start failed");
    return;
  }
  yield put({type: "CLUSTER.STATUS.REFRESH"});
  yield putNotification("SUCCESS", "Cluster was successfully started");
}
