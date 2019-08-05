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

import { DashboardActionType } from "./types";
import * as DashboardAction from "./actions";

export function* fetchDashboardData() {
  try {
    const apiClusterOverview = yield call(auth.getJson, "/clusters_overview");
    yield put<DashboardAction.FetchDashboardDataSuccess>({
      type: DashboardActionType.FETCH_DASHBOARD_DATA_SUCCESS,
      payload: { apiClusterOverview },
    });
  } catch (error) {
    const errorMessage = api.fail(error).message;
    yield all([
      put<NotificationAction.Create>(NotificationActionCreator.error(
        `Cannot sync dashboard data: ${errorMessage}`,
      )),
      put<DashboardAction.FetchDashboardDataFailed>(
        { type: DashboardActionType.FETCH_DASHBOARD_DATA_FAILED },
      ),
    ]);
  }
}

const getDashboardDataSyncOptions = () => ({
  START: DashboardActionType.SYNC_DASHBOARD_DATA,
  STOP: DashboardActionType.SYNC_DASHBOARD_DATA_STOP,
  SUCCESS: DashboardActionType.FETCH_DASHBOARD_DATA_SUCCESS,
  FAIL: DashboardActionType.FETCH_DASHBOARD_DATA_FAILED,
  refreshAction: { type: DashboardActionType.REFRESH_DASHBOARD_DATA },
  takeStartPayload: () => {},
  fetch: () => fork(fetchDashboardData),
});

export default [
  fork(dataLoadManage, getDashboardDataSyncOptions()),
];
