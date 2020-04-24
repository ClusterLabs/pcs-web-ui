import { all, call, fork, put } from "redux-saga/effects";

import { Action, SetupDataReading } from "app/actions";
import { ApiResult, failMessage, importedClusterList } from "app/backend";

import { putNotification } from "./notifications";
import { dataLoadManage } from "./dataLoad";
import { authSafe } from "./authSafe";

function* fetchDashboardData() {
  try {
    const result: ApiResult<typeof importedClusterList> = yield call(
      authSafe(importedClusterList),
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
    const clusterNameList = result.response.cluster_list.map(
      cluster => cluster.name,
    );
    yield put<Action>({
      type: "DASHBOARD_DATA.FETCH.SUCCESS",
      payload: { clusterNameList },
    });

    yield put<Action>({
      type: "DATA_READING.SET_UP",
      payload: [
        {
          specificator: "syncDashboard",
          start: { type: "DASHBOARD_DATA.SYNC" },
          stop: { type: "DASHBOARD_DATA.SYNC.STOP" },
        },
        ...clusterNameList.map(
          (clusterUrlName): SetupDataReading["payload"][0] => ({
            specificator: `syncCluster:${clusterUrlName}`,
            start: {
              type: "CLUSTER_DATA.SYNC",
              payload: { clusterUrlName },
            },
            stop: {
              type: "CLUSTER_DATA.SYNC.STOP",
              payload: { clusterUrlName },
            },
          }),
        ),
      ],
    });
  } catch (error) {
    const errorMessage = failMessage(error);
    yield all([
      putNotification("ERROR", `Cannot sync dashboard data: ${errorMessage}`),
      put<Action>({ type: "DASHBOARD_DATA.FETCH.FAILED" }),
    ]);
  }
}

const REFRESH = "DASHBOARD_DATA.REFRESH";
const dashboardDataSyncOptions: Parameters<typeof dataLoadManage>[0] = {
  START: "DASHBOARD_DATA.SYNC",
  STOP: "DASHBOARD_DATA.SYNC.STOP",
  REFRESH,
  SUCCESS: "DASHBOARD_DATA.FETCH.SUCCESS",
  FAIL: "DASHBOARD_DATA.FETCH.FAILED",
  refresh: () => ({ type: REFRESH }),
  fetch: fetchDashboardData,
};

export default [fork(dataLoadManage, dashboardDataSyncOptions)];
