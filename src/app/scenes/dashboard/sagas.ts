import {
  all,
  call,
  fork,
  put,
} from "redux-saga/effects";

import * as api from "app/common/api";
import { putNotification } from "app/scenes/notifications";
import { dataLoadManage } from "app/services/data-load/sagas";
import { clustersOverview, authSafe, ApiResult } from "app/common/backend";

import * as DashboardAction from "./actions";

export function* fetchDashboardData() {
  try {
    const result: ApiResult<typeof clustersOverview> = yield call(
      authSafe(clustersOverview),
    );
    if (!result.valid) {
      /* eslint-disable no-console */
      console.error(
        "Cannot sync dashboard data. Invalid response from backend. Errors:",
        result.errors,
      );
      yield all([
        putNotification(
          "ERROR",
          "Cannot sync dashboard data."
            + "Details are listed in the browser console."
          ,
        ),
        put<DashboardAction.FetchDashboardDataFailed>(
          { type: "DASHBOARD_DATA.FETCH.FAILED" },
        ),
      ]);
      return;
    }
    yield put<DashboardAction.FetchDashboardDataSuccess>({
      type: "DASHBOARD_DATA.FETCH.SUCCESS",
      payload: { apiClusterOverview: result.response },
    });
  } catch (error) {
    const errorMessage = api.error.failMessage(error);
    yield all([
      putNotification("ERROR", `Cannot sync dashboard data: ${errorMessage}`),
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
