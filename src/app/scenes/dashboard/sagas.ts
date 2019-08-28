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

import * as DashboardAction from "./actions";

export function* fetchDashboardData() {
  try {
    const apiClusterOverview = yield call(auth.getJson, "/clusters_overview");
    yield put<DashboardAction.FetchDashboardDataSuccess>({
      type: "DASHBOARD_DATA.FETCH.SUCCESS",
      payload: { apiClusterOverview },
    });
  } catch (error) {
    const errorMessage = api.error.failMessage(error);
    yield all([
      put<NotificationAction.Create>(NotificationActionCreator.error(
        `Cannot sync dashboard data: ${errorMessage}`,
      )),
      put<DashboardAction.FetchDashboardDataFailed>(
        { type: "DASHBOARD_DATA.FETCH.FAILED" },
      ),
    ]);
  }
}

const START: DashboardAction.SyncDashboardData["type"] = "DASHBOARD_DATA.SYNC";
const STOP: DashboardAction.SyncDashboardDataStop["type"] = (
  "DASHBOARD_DATA.SYNC.STOP"
);
const SUCCESS: DashboardAction.FetchDashboardDataSuccess["type"] = (
  "DASHBOARD_DATA.FETCH.SUCCESS"
);
const FAIL: DashboardAction.FetchDashboardDataFailed["type"] = (
  "DASHBOARD_DATA.FETCH.FAILED"
);

const refreshAction: DashboardAction.RefreshDashboardData = {
  type: "DASHBOARD_DATA.REFRESH",
};

const getDashboardDataSyncOptions = () => ({
  START,
  STOP,
  SUCCESS,
  FAIL,
  refreshAction,
  takeStartPayload: () => {},
  fetch: () => fork(fetchDashboardData),
});

export default [
  fork(dataLoadManage, getDashboardDataSyncOptions()),
];
