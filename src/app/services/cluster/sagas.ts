import { AnyAction } from "redux";
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
  SyncCLusterDataPayload,
} from "./types";

function* fetchClusterData(
  clusterUrlName: string,
  onErrorAction: (error: Error) => AnyAction[],
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
    yield all(onErrorAction(error).map(action => put(action)));
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
    takeStartPayload: (payload: SyncCLusterDataPayload) => {
      /* eslint-disable prefer-destructuring */
      clusterUrlName = payload.clusterUrlName;
    },
    fetch: () => fork(
      fetchClusterData,
      clusterUrlName,
      (error: Error) => [
        notify.error(
          `Cannot sync data for cluster '${clusterUrlName}': ${error.message}`,
          { disappear: 3000 },
        ),
        {
          type: FETCH_CLUSTER_DATA_FAILED,
          payload: {
            errorMsg: api.fail(error).message,
          },
        },
      ],
    ),
  };
};

export default [
  fork(dataLoadManage, getClusterDataSyncOptions()),
];
