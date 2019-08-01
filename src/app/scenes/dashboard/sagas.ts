import { AnyAction } from "redux";
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


export function* fetchDashboardData(
  onErrorActions: (error: Error) => AnyAction[],
) {
  try {
    const apiClusterOverview = yield call(auth.getJson, "/clusters_overview");
    yield put<FetchDashboardDataSuccessAction>({
      type: FETCH_DASHBOARD_DATA_SUCCESS,
      payload: { apiClusterOverview },
    });
  } catch (error) {
    yield all(onErrorActions(error).map(action => put(action)));
  }
}

const getDashboardDataSyncOptions = () => ({
  START: SYNC_DASHBOARD_DATA,
  STOP: SYNC_DASHBOARD_DATA_STOP,
  SUCCESS: FETCH_DASHBOARD_DATA_SUCCESS,
  FAIL: FETCH_DASHBOARD_DATA_FAILED,
  refreshAction: { type: REFRESH_DASHBOARD_DATA },
  takeStartPayload: () => {},
  fetch: () => fork(
    fetchDashboardData,
    (error: Error) => [
      notify.error(
        `Cannot sync dashboard data: ${error.message}`,
        { disappear: 3000 },
      ),
      {
        type: FETCH_DASHBOARD_DATA_FAILED,
        payload: { errorMessage: api.fail(error).message },
      } as FetchDashboardDataFailedAction,
    ],
  ),
});

export default [
  fork(dataLoadManage, getDashboardDataSyncOptions()),
];
