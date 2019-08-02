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
  FETCH_DASHBOARD_DATA_FAILED,
  FETCH_DASHBOARD_DATA_SUCCESS,
  REFRESH_DASHBOARD_DATA,
  SYNC_DASHBOARD_DATA,
  SYNC_DASHBOARD_DATA_STOP,
  FetchDashboardDataSuccessAction,
  FetchDashboardDataFailedAction,
} from "./types";


export function* fetchDashboardData() {
  try {
    const apiClusterOverview = yield call(auth.getJson, "/clusters_overview");
    yield put<FetchDashboardDataSuccessAction>({
      type: FETCH_DASHBOARD_DATA_SUCCESS,
      payload: { apiClusterOverview },
    });
  } catch (error) {
    const errorMessage = api.fail(error).message;
    yield all([
      put(notify.error(
        `Cannot sync dashboard data: ${errorMessage}`,
        { disappear: 3000 },
      )),
      put<FetchDashboardDataFailedAction>(
        { type: FETCH_DASHBOARD_DATA_FAILED },
      ),
    ]);
  }
}

const getDashboardDataSyncOptions = () => ({
  START: SYNC_DASHBOARD_DATA,
  STOP: SYNC_DASHBOARD_DATA_STOP,
  SUCCESS: FETCH_DASHBOARD_DATA_SUCCESS,
  FAIL: FETCH_DASHBOARD_DATA_FAILED,
  refreshAction: { type: REFRESH_DASHBOARD_DATA },
  takeStartPayload: () => {},
  fetch: () => fork(fetchDashboardData),
});

export default [
  fork(dataLoadManage, getDashboardDataSyncOptions()),
];
