import { destroyCluster } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processError, put, putNotification } from "./common";

export function* clusterDestroy({
  payload,
}: ActionMap["DASHBOARD.CLUSTER.DESTROY"]) {
  const result: api.ResultOf<typeof destroyCluster> = yield api.authSafe(
    destroyCluster,
    payload.clusterName,
  );

  if (result.type !== "OK") {
    yield processError(result, payload.clusterName);
    return;
  }

  yield putNotification("SUCCESS", "Cluster destroyed");
  yield put({ type: "CLUSTER.LIST.REFRESH" });
}
