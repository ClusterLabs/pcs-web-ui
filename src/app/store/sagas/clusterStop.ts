import { clusterStop } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, put, putNotification } from "./common";

export function* clusterStopSaga({
  payload: { clusterName, force },
}: ActionMap["DASHBOARD.CLUSTER.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    { clusterName, force },
  );

  if (result.type !== "OK") {
    yield putNotification("ERROR", "Cluster stop failed");
    return;
  }
  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    key: { clusterName },
  });
  yield putNotification("SUCCESS", "Cluster was successfully stopped");
}
