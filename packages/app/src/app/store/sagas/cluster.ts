import {clusterStatus} from "app/backend";
import {getClusterStoreInfo} from "app/store/selectors";

import {api, type dataLoad, put, select} from "./common";

type ClusterStoreInfo = ReturnType<typeof getClusterStoreInfo>;

export function* loadClusterStaticInfo() {
  yield put({type: "CLUSTER.PROPERTIES.LOAD"});
  yield put({type: "CLUSTER.PERMISSIONS.LOAD"});
  yield put({type: "RESOURCE_AGENT.LIST.LOAD"});
  yield put({type: "FENCE_AGENT.LIST.LOAD"});
}

export const noClusterDetectedCase = (result: api.result.AllFails) =>
  result.type === "BAD_HTTP_STATUS" &&
  result.status === 400 &&
  result.text.startsWith("This host is not in a cluster");

function* fetchClusterData() {
  const result: api.ResultOf<typeof clusterStatus> =
    yield api.authSafe(clusterStatus);

  const {
    clusterStatus: {data, isBackendNotFoundCase, noClusterDetected},
  }: ClusterStoreInfo = yield select(getClusterStoreInfo);

  if (result.type === "OK") {
    if (noClusterDetected) {
      yield put({type: "CLUSTER.STATIC_INFO.LOAD"});
    }
    yield put({type: "CLUSTER.STATUS.FETCH.OK", payload: result.payload});
    return;
  }

  // In the case of BACKEND_NOT_FOUND it is still necessary put action
  // CLUSTER.STATUS.FETCH.FAIL because it is a signal for periodical cluster
  // status reloading.
  // Redux store reacts on CLUSTER.STATUS.BACKEND_NOT_FOUND
  yield put({type: "CLUSTER.STATUS.FETCH.FAIL"});

  const backendNotFoundOnStart =
    result.type === "BACKEND_NOT_FOUND" && (!data || isBackendNotFoundCase);

  const isForbidden =
    result.type === "BAD_HTTP_STATUS" && result.status === 403;

  if (isForbidden) {
    yield put({type: "CLUSTER.STATUS.FETCH.FORBIDDEN"});
  } else if (backendNotFoundOnStart) {
    yield put({type: "CLUSTER.STATUS.BACKEND_NOT_FOUND"});
  } else if (noClusterDetectedCase(result)) {
    yield put({type: "CLUSTER.STATUS.NO_CLUSTER_DETECTED"});
  } else {
    yield api.processError(result, "sync status of cluster");
  }
}

const REFRESH = "CLUSTER.STATUS.REFRESH";
export const clusterDataSyncOptions: Parameters<typeof dataLoad.manage>[0] = {
  START: "CLUSTER.STATUS.SYNC",
  STOP: "CLUSTER.STATUS.SYNC.STOP",
  REFRESH,
  SUCCESS: "CLUSTER.STATUS.FETCH.OK",
  FAIL: "CLUSTER.STATUS.FETCH.FAIL",
  refresh: () => ({
    type: REFRESH,
  }),
  fetch: fetchClusterData,
};
