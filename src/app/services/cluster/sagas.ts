import {
  all,
  call,
  fork,
  put,
} from "redux-saga/effects";

import * as api from "app/core/api";
import * as auth from "app/services/auth/sagas";
import * as NotificationActionCreator
  from "app/scenes/notifications/actionCreators";
import * as NotificationAction from "app/scenes/notifications/actions";
import { dataLoadManage } from "app/services/data-load/sagas";

import { ClusterActionType } from "./types";

import * as ClusterAction from "./actions";

function* fetchClusterData(
  clusterUrlName: string,
) {
  try {
    const apiClusterStatus = yield call(
      auth.getJson,
      `/managec/${clusterUrlName}/cluster_status`,
    );
    yield put<ClusterAction.FetchClusterDataSuccess>({
      type: ClusterActionType.FETCH_CLUSTER_DATA_SUCCESS,
      payload: { apiClusterStatus },
    });
  } catch (error) {
    const errorMessage = api.fail(error).message;
    yield all([
      put<NotificationAction.Create>(NotificationActionCreator.error(
        `Cannot sync data for cluster '${clusterUrlName}': ${errorMessage}`,
      )),
      put<ClusterAction.FetchClusterDataFailed>({
        type: ClusterActionType.FETCH_CLUSTER_DATA_FAILED,
      }),
    ]);
  }
}

const getClusterDataSyncOptions = () => {
  let clusterUrlName = "";
  return {
    START: ClusterActionType.SYNC_CLUSTER_DATA,
    STOP: ClusterActionType.SYNC_CLUSTER_DATA_STOP,
    SUCCESS: ClusterActionType.FETCH_CLUSTER_DATA_SUCCESS,
    FAIL: ClusterActionType.FETCH_CLUSTER_DATA_FAILED,
    refreshAction: { type: ClusterActionType.REFRESH_CLUSTER_DATA },
    takeStartPayload: (payload: ClusterAction.SyncClusterDataPayload) => {
      ({ clusterUrlName } = payload);
    },
    fetch: () => fork(fetchClusterData, clusterUrlName),
  };
};

export default [
  fork(dataLoadManage, getClusterDataSyncOptions()),
];
