import {getPermissions} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, put} from "./common";

export function* load({key}: ActionMap["CLUSTER.PERMISSIONS.LOAD"]) {
  const result: api.ResultOf<typeof getPermissions> = yield api.authSafe(
    getPermissions,
    {clusterName: key.clusterName},
  );

  const taskLabel = `load cluster permissions of cluster ${key.clusterName}`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.PERMISSIONS.LOAD.ERROR",
          key,
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER.PERMISSIONS.LOAD.OK",
    key,
    payload: {apiClusterPermissions: result.payload},
  });
}
