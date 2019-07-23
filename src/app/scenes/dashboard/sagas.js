import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from "redux-saga/effects";

import * as api from "app/core/api";
import * as auth from "app/services/auth/sagas";
import * as notify from "app/scenes/notifications/actions";
import { dataLoadManage } from "app/services/data-load/sagas";

import * as actions from "./actions";
import * as types from "./types";


export function* fetchDashboardData(onErrorAction) {
  try {
    const apiClusterOverview = yield call(auth.getJson, "/clusters_overview");
    yield put(actions.fetchDashboardDataSuccess(apiClusterOverview));
  } catch (error) {
    yield all(onErrorAction(error).map(action => put(action)));
  }
}

const getDashboardDataSyncOptions = () => ({
  START: types.SYNC_DASHBOARD_DATA,
  STOP: types.SYNC_DASHBOARD_DATA_STOP,
  SUCCESS: types.FETCH_DASHBOARD_DATA_SUCCESS,
  FAIL: types.FETCH_DASHBOARD_DATA_FAILED,
  refreshAction: actions.refreshDashboardData(),
  takeStartPayload: () => {},
  fetch: () => fork(
    fetchDashboardData,
    error => [
      notify.error(
        `Cannot sync dashboard data: ${error.message}`,
        { disappear: 3000 },
      ),
      actions.fetchDashboardDataFailed(api.fail(error).message),
    ],
  ),
});

export default [
  takeEvery(types.FETCH_DASHBOARD_DATA, fetchDashboardData),
  fork(dataLoadManage, getDashboardDataSyncOptions()),
];
