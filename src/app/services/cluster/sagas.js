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

import * as actions from "./actions";
import * as types from "./constants";

function* fetchClusterData(clusterUrlName, onErrorAction) {
  try {
    const apiClusterState = yield call(
      auth.getJson,
      `/managec/${clusterUrlName}/cluster_status`,
    );
    yield put(actions.fetchClusterDataSuccess(apiClusterState));
  } catch (error) {
    yield all(onErrorAction(error).map(action => put(action)));
  }
}

const getClusterDataSyncOptions = () => {
  let clusterUrlName = "";
  /* eslint-disable prefer-destructuring */
  return {
    START: types.SYNC_CLUSTER_DATA,
    STOP: types.SYNC_CLUSTER_DATA_STOP,
    SUCCESS: types.FETCH_CLUSTER_DATA_SUCCESS,
    FAIL: types.FETCH_CLUSTER_DATA_FAILED,
    refreshAction: actions.refreshClusterData(),
    takeStartPayload: (payload) => { clusterUrlName = payload.clusterUrlName; },
    fetch: () => fork(
      fetchClusterData,
      clusterUrlName,
      error => [
        notify.error(
          `Cannot sync data for cluster '${clusterUrlName}': ${error.message}`,
          { disappear: 3000 },
        ),
        actions.fetchClusterDataFailed(api.fail(error)),
      ],
    ),
  };
};

export default [
  fork(dataLoadManage, getClusterDataSyncOptions()),
];
