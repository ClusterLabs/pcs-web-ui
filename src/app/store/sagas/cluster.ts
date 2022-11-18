import {clusterStatus} from "app/backend";
import {Action} from "app/store/actions";

import {api, dataLoad, fork, put} from "./common";

function* fetchClusterData(clusterName: string) {
  const result: api.ResultOf<typeof clusterStatus> = yield api.authSafe(
    clusterStatus,
    clusterName,
  );

  const taskLabel = `sync status of cluster "${clusterName}"`;
  if (result.type !== "OK") {
    if (result.type === "BAD_HTTP_STATUS" && result.status === 403) {
      yield put({
        type: "CLUSTER.STATUS.FETCH.FORBIDDEN",
        key: {clusterName},
      });
    }
    yield api.processError(result, taskLabel);
    yield put({
      type: "CLUSTER.STATUS.FETCH.FAIL",
      key: {clusterName},
    });
    return;
  }

  yield put({
    type: "CLUSTER.STATUS.FETCH.OK",
    key: {clusterName},
    payload: result.payload,
  });
}

const REFRESH = "CLUSTER.STATUS.REFRESH";
export const clusterDataSyncOptions: Parameters<typeof dataLoad.manage>[0] = {
  START: "CLUSTER.STATUS.SYNC",
  STOP: "CLUSTER.STATUS.SYNC.STOP",
  REFRESH,
  SUCCESS: "CLUSTER.STATUS.FETCH.OK",
  FAIL: "CLUSTER.STATUS.FETCH.FAIL",
  refresh: (clusterName = "") => ({
    type: REFRESH,
    key: {clusterName},
  }),
  fetch: fetchClusterData,
  getSyncId: (action: Action) => {
    switch (action.type) {
      case "CLUSTER.STATUS.SYNC":
      case "CLUSTER.STATUS.SYNC.STOP":
      case "CLUSTER.STATUS.FETCH.OK":
      case "CLUSTER.STATUS.FETCH.FAIL":
      case "CLUSTER.STATUS.REFRESH":
        return action.key.clusterName;

      default:
        return "";
    }
  },
};

export default [fork(dataLoad.manage, clusterDataSyncOptions)];
