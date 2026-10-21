import {getPermissions} from "app/backend";

import {api, put} from "./common";

export function* load() {
  const result: api.ResultOf<typeof getPermissions> =
    yield api.authSafe(getPermissions);

  const taskLabel = "load cluster permissions";
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () => put({type: "CLUSTER.PERMISSIONS.LOAD.ERROR"}),
    });
    return;
  }

  yield put({
    type: "CLUSTER.PERMISSIONS.LOAD.OK",
    payload: {apiClusterPermissions: result.payload},
  });
}
