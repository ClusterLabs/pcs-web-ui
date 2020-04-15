import { all, call, fork, put } from "redux-saga/effects";

import { Action } from "app/actions";
import { ApiResult, clustersOverview, failMessage } from "app/backend";

import { putNotification } from "./notifications";
import { DataLoadProps, dataLoadManage } from "./dataLoad";
import { authSafe } from "./authSafe";

function* fetchDashboardData() {
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
            + "Details are listed in the browser console.",
        ),
        put<Action>({ type: "DASHBOARD_DATA.FETCH.FAILED" }),
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
      put<Action>({ type: "DASHBOARD_DATA.FETCH.FAILED" }),
    ]);
  }
}

const getDashboardDataSyncOptions = (): DataLoadProps => ({
  START: "DASHBOARD_DATA.SYNC",
  STOP: "DASHBOARD_DATA.SYNC.STOP",
  SUCCESS: "DASHBOARD_DATA.FETCH.SUCCESS",
  FAIL: "DASHBOARD_DATA.FETCH.FAILED",
  refresh: () => ({ type: "DASHBOARD_DATA.REFRESH" }),
  /* eslint-disable @typescript-eslint/no-empty-function */
  takeStartPayload: () => {},
  fetch: () => fork(fetchDashboardData),
});

export default [fork(dataLoadManage, getDashboardDataSyncOptions())];
