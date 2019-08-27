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

import * as ClusterAction from "./actions";

function* fetchClusterData(clusterUrlName: string) {
  try {
    const apiClusterStatus = yield call(
      auth.getJson,
      `/managec/${clusterUrlName}/cluster_status`,
    );
    yield put<ClusterAction.FetchClusterDataSuccess>({
      type: "CLUSTER_DATA.FETCH.SUCCESS",
      payload: { apiClusterStatus },
    });
  } catch (error) {
    const errorMessage = api.error.failMessage(error);
    yield all([
      put<NotificationAction.Create>(NotificationActionCreator.error(
        `Cannot sync data for cluster '${clusterUrlName}': ${errorMessage}`,
      )),
      put<ClusterAction.FetchClusterDataFailed>({
        type: "CLUSTER_DATA.FETCH.FAILED",
      }),
    ]);
  }
}

const START: ClusterAction.SyncClusterData["type"] = ("CLUSTER_DATA.SYNC");
const SUCCESS: ClusterAction.FetchClusterDataSuccess["type"] = (
  "CLUSTER_DATA.FETCH.SUCCESS"
);
const STOP: ClusterAction.SyncClusterDataStop["type"] = (
  "CLUSTER_DATA.SYNC.STOP"
);
const FAIL: ClusterAction.FetchClusterDataFailed["type"] = (
  "CLUSTER_DATA.FETCH.FAILED"
);
const refreshAction: ClusterAction.RefreshClusterData = {
  type: "CLUSTER_DATA.REFRESH",
};

const getClusterDataSyncOptions = () => {
  let clusterUrlName = "";
  return {
    START,
    STOP,
    SUCCESS,
    FAIL,
    refreshAction,
    takeStartPayload: (payload: ClusterAction.SyncClusterDataPayload) => {
      ({ clusterUrlName } = payload);
    },
    fetch: () => fork(fetchClusterData, clusterUrlName),
  };
};

export default [
  fork(dataLoadManage, getClusterDataSyncOptions()),
];
