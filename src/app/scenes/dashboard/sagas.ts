import {
  all,
  call,
  fork,
  put,
} from "redux-saga/effects";

import { failMessage } from "app/backend";
import { putNotification } from "app/scenes/notifications";
import { dataLoadManage, DataLoadProps } from "app/services/data-load/sagas";
import { clustersOverview, authSafe, ApiResult } from "app/backend";

import { Action } from "app/actions";

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
        put<Action>(
          { type: "DASHBOARD_DATA.FETCH.FAILED" },
        ),
      ]);
      return;
    }
    yield put<Action>({
      type: "DASHBOARD_DATA.FETCH.SUCCESS",
      payload: { apiClusterOverview: result.response },
    });
  } catch (error) {
    const errorMessage = failMessage(error);
    yield all([
      putNotification("ERROR", `Cannot sync dashboard data: ${errorMessage}`),
      put<Action>(
        { type: "DASHBOARD_DATA.FETCH.FAILED" },
      ),
    ]);
  }
}

const getDashboardDataSyncOptions = (): DataLoadProps => ({
  START: "DASHBOARD_DATA.SYNC",
  STOP: "DASHBOARD_DATA.SYNC.STOP",
  SUCCESS: "DASHBOARD_DATA.FETCH.SUCCESS",
  FAIL: "DASHBOARD_DATA.FETCH.FAILED",
  refreshAction: { type: "DASHBOARD_DATA.REFRESH" },
  takeStartPayload: () => {},
  fetch: () => fork(fetchDashboardData),
});

export default [
  fork(dataLoadManage, getDashboardDataSyncOptions()),
];
