import {destroyCluster, removeCluster} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, log, processError, put, putNotification} from "./common";

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

  yield putNotification(
    "SUCCESS",
    "Cluster destroyed. Trying to remove it from webUI...",
  );

  const removeResult: api.ResultOf<typeof removeCluster> = yield api.authSafe(
    removeCluster,
    payload.clusterName,
  );

  if (removeResult.type !== "OK") {
    log.error(removeResult, `remove cluster ${payload.clusterName}`);
    yield putNotification(
      "ERROR",
      "Cannot remove cluster from webUI after successful cluster destroy."
        + " You can try it later manually. Details in the browser console.",
    );
    return;
  }

  yield put({type: "CLUSTER.LIST.REFRESH"});
  yield putNotification("SUCCESS", "Cluster removed from webUI");
}
