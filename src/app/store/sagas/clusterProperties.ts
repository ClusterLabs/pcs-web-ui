import { clusterProperties } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, put, takeEvery } from "./common";

function* loadClusterProperties({
  payload: { clusterUrlName },
}: ActionMap["CLUSTER.PROPERTIES.LOAD"]) {
  const result: api.ResultOf<typeof clusterProperties> = yield api.authSafe(
    clusterProperties,
    clusterUrlName,
  );

  const taskLabel = `load cluster properties of cluster ${clusterUrlName}`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.PROPERTIES.LOAD.ERROR",
          payload: { clusterUrlName },
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER.PROPERTIES.LOAD.OK",
    payload: { apiClusterProperties: result.payload, clusterUrlName },
  });
}
export default [takeEvery("CLUSTER.PROPERTIES.LOAD", loadClusterProperties)];
