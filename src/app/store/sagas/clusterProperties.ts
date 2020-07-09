import { call, put, takeEvery } from "redux-saga/effects";

import { Action, ClusterPropertiesActions, actionType } from "app/actions";
import { ApiResult, clusterProperties } from "app/backend";

import { authSafe } from "./authSafe";

function* loadClusterProperties({
  payload: { clusterUrlName },
}: ClusterPropertiesActions["LoadClusterProperties"]) {
  const result: ApiResult<typeof clusterProperties> = yield call(
    authSafe(clusterProperties),
    clusterUrlName,
  );

  if (!result.valid) {
    yield put<Action>({
      type: "CLUSTER_PROPERTIES.LOAD.FAILED",
      payload: { clusterUrlName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put<Action>({
    type: "CLUSTER_PROPERTIES.LOAD.SUCCESS",
    payload: { apiClusterPropertis: result.response, clusterUrlName },
  });
}
export default [
  takeEvery(actionType("CLUSTER_PROPERTIES.LOAD"), loadClusterProperties),
];
