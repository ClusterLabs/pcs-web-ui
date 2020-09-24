import { api, clusterStatus } from "app/backend";
import { Action } from "app/store/actions";

import { fork, put } from "./effects";
import { dataLoadManage } from "./dataLoad";
import { callAuthSafe } from "./authSafe";
import { callError } from "./backendTools";

function* fetchClusterData(clusterUrlName: string) {
  const result: api.ResultOf<typeof clusterStatus> = yield callAuthSafe(
    clusterStatus,
    clusterUrlName,
  );

  const taskLabel = `sync status of cluster "${clusterUrlName}"`;
  if (result.type !== "OK") {
    yield callError(result, taskLabel);
    return;
  }

  yield put({
    type: "CLUSTER_DATA.FETCH.SUCCESS",
    payload: {
      clusterUrlName,
      apiClusterStatus: result.payload,
    },
  });
}

const REFRESH = "CLUSTER_DATA.REFRESH";
const clusterDataSyncOptions: Parameters<typeof dataLoadManage>[0] = {
  START: "CLUSTER_DATA.SYNC",
  STOP: "CLUSTER_DATA.SYNC.STOP",
  REFRESH,
  SUCCESS: "CLUSTER_DATA.FETCH.SUCCESS",
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
      case "CLUSTER_DATA.REFRESH":
        return action.payload.clusterUrlName;
      default:
        return "";
    }
  },
};

export default [fork(dataLoadManage, clusterDataSyncOptions)];
