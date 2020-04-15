import { all, call, fork, put } from "redux-saga/effects";

import { Action, ClusterActions } from "app/actions";
import { ApiResult, clusterStatus, failMessage } from "app/backend";

import { putNotification } from "./notifications";
import { DataLoadProps, dataLoadManage } from "./dataLoad";
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

const getClusterDataSyncOptions = (): DataLoadProps => {
  let clusterUrlName = "";
  return {
    START: "CLUSTER_DATA.SYNC",
    STOP: "CLUSTER_DATA.SYNC.STOP",
    SUCCESS: "CLUSTER_DATA.FETCH.SUCCESS",
    FAIL: "CLUSTER_DATA.FETCH.FAILED",
    refresh: (clusterName = "") => ({
      type: "CLUSTER_DATA.REFRESH",
      payload: { clusterUrlName: clusterName },
    }),
    takeStartPayload: (
      payload: ClusterActions["SyncClusterData"]["payload"],
    ) => {
      ({ clusterUrlName } = payload);
    },
    fetch: () => fork(fetchClusterData, clusterUrlName),
  };
};

export default [fork(dataLoadManage, getClusterDataSyncOptions())];
