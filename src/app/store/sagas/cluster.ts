import { clusterStatus } from "app/backend";
import { Action } from "app/store/actions";

import { api, dataLoad, fork, put } from "./common";

function* fetchClusterData(clusterUrlName: string) {
  const result: api.ResultOf<typeof clusterStatus> = yield api.authSafe(
    clusterStatus,
    clusterUrlName,
  );

  const taskLabel = `sync status of cluster "${clusterUrlName}"`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel);
    return;
  }

  yield put({
    type: "CLUSTER.STATUS.FETCH.OK",
    payload: {
      clusterUrlName,
      apiClusterStatus: result.payload,
    },
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
    payload: { clusterUrlName: clusterName },
  }),
  fetch: fetchClusterData,
  getSyncId: (action: Action) => {
    switch (action.type) {
      case "CLUSTER.STATUS.SYNC":
      case "CLUSTER.STATUS.SYNC.STOP":
      case "CLUSTER.STATUS.FETCH.OK":
      case "CLUSTER.STATUS.REFRESH":
        return action.payload.clusterUrlName;
      default:
        return "";
    }
  },
};

export default [fork(dataLoad.manage, clusterDataSyncOptions)];
