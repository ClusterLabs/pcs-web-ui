import { all, call, fork, put } from "redux-saga/effects";

import { ApiResult, clusterStatus, failMessage } from "app/backend";
import { Action } from "app/store/actions";

import { putNotification } from "./notifications";
import { dataLoadManage } from "./dataLoad";
import { authSafe } from "./authSafe";

function* fetchClusterData(clusterUrlName: string) {
  try {
    const result: ApiResult<typeof clusterStatus> = yield call(
      authSafe(clusterStatus),
      clusterUrlName,
    );
    if (!result.valid) {
      /* eslint-disable no-console */
      console.error(
        "Cannot sync data for cluster. Invalid response from backend. Errors:",
        result.errors,
      );
      yield all([
        putNotification(
          "ERROR",
          `Cannot sync data for cluster '${clusterUrlName}'. `
            + "Details are listed in the browser console.",
        ),
        put<Action>({
          type: "CLUSTER_DATA.FETCH.FAILED",
          payload: { clusterUrlName },
        }),
      ]);
      return;
    }

    yield put<Action>({
      type: "CLUSTER_DATA.FETCH.SUCCESS",
      payload: {
        clusterUrlName,
        apiClusterStatus: result.response,
      },
    });
  } catch (error) {
    const errorMessage = failMessage(error);
    yield all([
      putNotification(
        "ERROR",
        `Cannot sync data for cluster '${clusterUrlName}': ${errorMessage}`,
      ),
      put<Action>({
        type: "CLUSTER_DATA.FETCH.FAILED",
        payload: { clusterUrlName },
      }),
    ]);
  }
}

const REFRESH = "CLUSTER_DATA.REFRESH";
const clusterDataSyncOptions: Parameters<typeof dataLoadManage>[0] = {
  START: "CLUSTER_DATA.SYNC",
  STOP: "CLUSTER_DATA.SYNC.STOP",
  REFRESH,
  SUCCESS: "CLUSTER_DATA.FETCH.SUCCESS",
  FAIL: "CLUSTER_DATA.FETCH.FAILED",
  refresh: (clusterName = "") => ({
    type: REFRESH,
    payload: { clusterUrlName: clusterName },
  }),
  fetch: fetchClusterData,
  getSyncId: (action: Action) => {
    switch (action.type) {
      case "CLUSTER_DATA.SYNC":
      case "CLUSTER_DATA.SYNC.STOP":
      case "CLUSTER_DATA.FETCH.SUCCESS":
      case "CLUSTER_DATA.FETCH.FAILED":
      case "CLUSTER_DATA.REFRESH":
        return action.payload.clusterUrlName;
      default:
        return "";
    }
  },
};

export default [fork(dataLoadManage, clusterDataSyncOptions)];
