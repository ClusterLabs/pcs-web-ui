import {importedClusterList} from "app/backend";
import {ActionPayload} from "app/store/actions";

import {api, dataLoad, put} from "./common";

type Reading = ActionPayload["DATA_READING.SET_UP"]["readings"][number];

function* fetchClusterList() {
  const result: api.ResultOf<typeof importedClusterList> = yield api.authSafe(
    importedClusterList,
  );
  const taskLabel = "sync imported cluster list";
  if (result.type !== "OK") {
    yield put({type: "CLUSTER.LIST.FETCH.FAIL"});
    yield api.processError(result, taskLabel);
    return;
  }

  const clusterNameList = result.payload.cluster_list.map(c => c.name);

  yield put({type: "CLUSTER.LIST.FETCH.OK", payload: {clusterNameList}});
  yield put({
    type: "DATA_READING.SET_UP",
    payload: {
      behavior: "replace",
      readings: [
        {
          // syncDashboard must be here, because DATA_READING.SET_UP stops
          // everything old, that is not renewed in this new action payload
          id: "syncDashboard",
          start: {type: "CLUSTER.LIST.SYNC"},
          stop: {type: "CLUSTER.LIST.SYNC.STOP"},
        },
        ...clusterNameList.map(
          (clusterName): Reading => ({
            id: `syncCluster:${clusterName}`,
            start: {type: "CLUSTER.STATUS.SYNC", key: {clusterName}},
            stop: {type: "CLUSTER.STATUS.SYNC.STOP", key: {clusterName}},
          }),
        ),
      ],
    },
  });
}

const REFRESH = "CLUSTER.LIST.REFRESH";
export const clusterListSyncOptions: Parameters<typeof dataLoad.manage>[0] = {
  START: "CLUSTER.LIST.SYNC",
  STOP: "CLUSTER.LIST.SYNC.STOP",
  REFRESH,
  SUCCESS: "CLUSTER.LIST.FETCH.OK",
  FAIL: "CLUSTER.LIST.FETCH.FAIL",
  refresh: () => ({type: REFRESH}),
  fetch: fetchClusterList,
};
