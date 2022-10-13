import { clusterStart } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, put, putNotification } from "./common";

export function* clusterStartSaga({
  payload: { clusterName },
}: ActionMap["DASHBOARD.CLUSTER.START"]) {
  const result: api.ResultOf<typeof clusterStart> = yield api.authSafe(
    clusterStart,
    clusterName,
  );

  if (result.type !== "OK") {
    yield putNotification("ERROR", "Cluster start failed");
    return;
  }
  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    key: { clusterName },
  });
  yield putNotification("SUCCESS", "Cluster was successfully started");
}
