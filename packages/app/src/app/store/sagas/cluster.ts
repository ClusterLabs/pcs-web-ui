import {clusterStatus} from "app/backend";
import {CLUSTER_KEY} from "app/store/clusterStorageKey";
import {getClusterStoreInfo} from "app/store/selectors";

import {api, type dataLoad, put, select} from "./common";

type ClusterStoreInfo = ReturnType<typeof getClusterStoreInfo>;

function* fetchClusterData() {
  const result: api.ResultOf<typeof clusterStatus> =
    yield api.authSafe(clusterStatus);

  if (result.type === "OK") {
    yield put({
      type: "CLUSTER.STATUS.FETCH.OK",
      key: {clusterName: CLUSTER_KEY},
      payload: result.payload,
    });
    return;
  }

  // In the case of BACKEND_NOT_FOUND it is still necessary put action
  // CLUSTER.STATUS.FETCH.FAIL because it is a signal for periodical cluster
  // status reloading.
  // Redux store reacts on CLUSTER.STATUS.BACKEND_NOT_FOUND
  yield put({
    type: "CLUSTER.STATUS.FETCH.FAIL",
    key: {clusterName: CLUSTER_KEY},
  });

  const {
    clusterStatus: {data, isBackendNotFoundCase},
  }: ClusterStoreInfo = yield select(getClusterStoreInfo);

  const backendNotFoundOnStart =
    result.type === "BACKEND_NOT_FOUND" && (!data || isBackendNotFoundCase);

  const isForbidden =
    result.type === "BAD_HTTP_STATUS" && result.status === 403;

  if (isForbidden) {
    yield put({
      type: "CLUSTER.STATUS.FETCH.FORBIDDEN",
      key: {clusterName: CLUSTER_KEY},
    });
  } else if (backendNotFoundOnStart) {
    yield put({
      type: "CLUSTER.STATUS.BACKEND_NOT_FOUND",
      key: {clusterName: CLUSTER_KEY},
    });
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
    key: {clusterName: CLUSTER_KEY},
  }),
  fetch: fetchClusterData,
};
