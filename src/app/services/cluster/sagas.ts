import {
  all,
  call,
  fork,
  put,
} from "redux-saga/effects";

import * as api from "app/common/api";
import { putNotification } from "app/scenes/notifications";
import { dataLoadManage } from "app/services/data-load/sagas";
import { clusterStatus, authSafe, ApiResult } from "app/common/backend";

import * as ClusterAction from "./actions";

function* fetchClusterData(clusterUrlName: string) {
  try {
    const result: ApiResult<typeof clusterStatus> = yield call(
      authSafe(clusterStatus),
      clusterUrlName,
    );
    if (!result.valid) {
      /* eslint-disable no-console */
      console.error(
        "Cannot sync data for cluster. Invalid response from backend. Errors:",
        result.errors,
      );
      yield all([
        putNotification(
          "ERROR",
          `Cannot sync data for cluster '${clusterUrlName}'. `
            + "Details are listed in the browser console."
          ,
        ),
        put<ClusterAction.FetchClusterDataFailed>({
          type: "CLUSTER_DATA.FETCH.FAILED",
        }),
      ]);
      return;
    }

    yield put<ClusterAction.FetchClusterDataSuccess>({
      type: "CLUSTER_DATA.FETCH.SUCCESS",
      payload: { apiClusterStatus: result.response },
    });
  } catch (error) {
    const errorMessage = api.error.failMessage(error);
    yield all([
      putNotification(
        "ERROR",
        `Cannot sync data for cluster '${clusterUrlName}': ${errorMessage}`,
      ),
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
