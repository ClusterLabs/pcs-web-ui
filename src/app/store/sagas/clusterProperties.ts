import { clusterProperties } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, put, takeEvery } from "./common";

function* loadClusterProperties({ key }: ActionMap["CLUSTER.PROPERTIES.LOAD"]) {
  const result: api.ResultOf<typeof clusterProperties> = yield api.authSafe(
    clusterProperties,
    key.clusterName,
  );

  const taskLabel = `load cluster properties of cluster ${key.clusterName}`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.PROPERTIES.LOAD.ERROR",
          key,
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER.PROPERTIES.LOAD.OK",
    key,
    payload: { apiClusterProperties: result.payload },
  });
}
export default [takeEvery("CLUSTER.PROPERTIES.LOAD", loadClusterProperties)];
