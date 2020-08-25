import { ApiResult, clusterProperties } from "app/backend";
import { ClusterPropertiesActions } from "app/store/actions";

import { call, put, takeEvery } from "./effects";
import { authSafe } from "./authSafe";

function* loadClusterProperties({
  payload: { clusterUrlName },
}: ClusterPropertiesActions["LoadClusterProperties"]) {
  const result: ApiResult<typeof clusterProperties> = yield call(
    authSafe(clusterProperties),
    clusterUrlName,
  );

  if (!result.valid) {
    yield put({
      type: "CLUSTER_PROPERTIES.LOAD.FAILED",
      payload: { clusterUrlName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put({
    type: "CLUSTER_PROPERTIES.LOAD.SUCCESS",
    payload: { apiClusterProperties: result.response, clusterUrlName },
  });
}
export default [takeEvery("CLUSTER_PROPERTIES.LOAD", loadClusterProperties)];
