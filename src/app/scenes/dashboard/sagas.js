import {
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
import * as types from "./constants";

export function* fetchDashboardData(onErrorAction) {
  try {
    const dashboardData = yield call(auth.getJson, "/clusters_overview", {
      transform: apiData => ({
        clusterList: apiData.cluster_list.map(
          cluster => ({ name: cluster.cluster_name }),
        ),
      }),
    });
    yield put(actions.fetchDashboardDataSuccess(dashboardData));
  } catch (error) {
    yield put(onErrorAction(error));
  }
}

const getDashboardDataSyncOptions = () => ({
  START: types.SYNC_DASHBOARD_DATA,
  STOP: types.SYNC_DASHBOARD_DATA_STOP,
  SUCCESS: types.FETCH_DASHBOARD_DATA_SUCCESS,
  FAIL: types.FETCH_DASHBOARD_DATA_FAILED,
  refreshAction: actions.refreshDashboardData(),
  takeStartPayload: () => {},
  initFetch: () => [
    fetchDashboardData,
    error => actions.fetchDashboardDataFailed(api.fail(error)),
  ],
  fetch: () => [fetchDashboardData, error => notify.error(
    `Cannot sync dashboard data: ${error.message}`,
    { disappear: 2000 },
  )],
});

export default [
  takeEvery(types.FETCH_DASHBOARD_DATA, fetchDashboardData),
  fork(dataLoadManage, getDashboardDataSyncOptions()),
];
