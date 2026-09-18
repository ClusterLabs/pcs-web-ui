import {destroyCluster} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processError, putNotification} from "./common";

export function* clusterDestroy({
  payload,
}: ActionMap["DASHBOARD.CLUSTER.DESTROY"]) {
  const result: api.ResultOf<typeof destroyCluster> =
    yield api.authSafe(destroyCluster);

  if (result.type !== "OK") {
    yield processError(result, payload.clusterName);
    return;
  }

  yield putNotification("SUCCESS", "Cluster destroyed");
}
