import { clusterStop } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, putNotification } from "./common";

export function* clusterStopSaga({
  payload: { clusterName },
}: ActionMap["DASHBOARD.CLUSTER.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    clusterName,
  );

  if (result.type !== "OK") {
    yield putNotification("ERROR", "Cluster stop failed");
    return;
  }
  yield putNotification("SUCCESS", "Cluster was successfully stopped");
}
