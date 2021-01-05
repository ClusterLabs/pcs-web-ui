import { clusterStatus } from "app/backend";
import { Action } from "app/store/actions";

import { api, dataLoad, fork, put } from "./common";

function* fetchClusterData(clusterName: string) {
  const result: api.ResultOf<typeof clusterStatus> = yield api.authSafe(
    clusterStatus,
    clusterName,
  );

  const taskLabel = `sync status of cluster "${clusterName}"`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel);
    return;
  }

  yield put({
    type: "CLUSTER.STATUS.FETCH.OK",
    id: { cluster: clusterName },
    payload: { apiClusterStatus: result.payload },
  });
}

const REFRESH = "CLUSTER.STATUS.REFRESH";
const clusterDataSyncOptions: Parameters<typeof dataLoad.manage>[0] = {
  START: "CLUSTER.STATUS.SYNC",
  STOP: "CLUSTER.STATUS.SYNC.STOP",
  REFRESH,
  SUCCESS: "CLUSTER.STATUS.FETCH.OK",
  refresh: (clusterName = "") => ({
    type: REFRESH,
    id: { cluster: clusterName },
  }),
  fetch: fetchClusterData,
  getSyncId: (action: Action) => {
    switch (action.type) {
      case "CLUSTER.STATUS.SYNC":
      case "CLUSTER.STATUS.SYNC.STOP":
      case "CLUSTER.STATUS.FETCH.OK":
      case "CLUSTER.STATUS.REFRESH":
        return action.id.cluster;
      default:
        return "";
    }
  },
};

export default [fork(dataLoad.manage, clusterDataSyncOptions)];
