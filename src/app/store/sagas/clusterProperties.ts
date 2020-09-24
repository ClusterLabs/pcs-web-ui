import { api, clusterProperties } from "app/backend";
import { ClusterPropertiesActions } from "app/store/actions";

import { put, takeEvery } from "./effects";
import { callAuthSafe } from "./authSafe";
import { callError } from "./backendTools";

function* loadClusterProperties({
  payload: { clusterUrlName },
}: ClusterPropertiesActions["LoadClusterProperties"]) {
  const result: api.ResultOf<typeof clusterProperties> = yield callAuthSafe(
    clusterProperties,
    clusterUrlName,
  );

  const taskLabel = `load cluster properties of cluster ${clusterUrlName}`;
  if (result.type !== "OK") {
    yield callError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER_PROPERTIES.LOAD.FAILED",
          payload: { clusterUrlName },
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER_PROPERTIES.LOAD.SUCCESS",
    payload: { apiClusterProperties: result.payload, clusterUrlName },
  });
}
export default [takeEvery("CLUSTER_PROPERTIES.LOAD", loadClusterProperties)];
