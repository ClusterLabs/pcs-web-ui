import {
  all,
  call,
  fork,
  put,
} from "redux-saga/effects";

import * as api from "app/core/api";
import * as auth from "app/services/auth/sagas";
import * as notify from "app/scenes/notifications/actions";
import { dataLoadManage } from "app/services/data-load/sagas";

import {
  SYNC_CLUSTER_DATA,
  SYNC_CLUSTER_DATA_STOP,
  FETCH_CLUSTER_DATA_SUCCESS,
  FETCH_CLUSTER_DATA_FAILED,
  REFRESH_CLUSTER_DATA,
  SyncClusterDataPayload,
  FetchClusterDataFailedAction,
} from "./types";

function* fetchClusterData(
  clusterUrlName: string,
) {
  try {
    const apiClusterStatus = yield call(
      auth.getJson,
      `/managec/${clusterUrlName}/cluster_status`,
    );
    yield put({
      type: FETCH_CLUSTER_DATA_SUCCESS,
      payload: { apiClusterStatus },
    });
  } catch (error) {
    const errorMessage = api.fail(error).message;
    yield all([
      put(notify.error(
        `Cannot sync data for cluster '${clusterUrlName}': ${errorMessage}`,
        { disappear: 3000 },
      )),
      put<FetchClusterDataFailedAction>({ type: FETCH_CLUSTER_DATA_FAILED }),
    ]);
  }
}

const getClusterDataSyncOptions = () => {
  let clusterUrlName = "";
  return {
    START: SYNC_CLUSTER_DATA,
    STOP: SYNC_CLUSTER_DATA_STOP,
    SUCCESS: FETCH_CLUSTER_DATA_SUCCESS,
    FAIL: FETCH_CLUSTER_DATA_FAILED,
    refreshAction: { type: REFRESH_CLUSTER_DATA },
    takeStartPayload: (payload: SyncClusterDataPayload) => {
      ({ clusterUrlName } = payload);
    },
    fetch: () => fork(fetchClusterData, clusterUrlName),
  };
};

export default [
  fork(dataLoadManage, getClusterDataSyncOptions()),
];
