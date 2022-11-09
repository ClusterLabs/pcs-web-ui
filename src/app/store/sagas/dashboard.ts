import {importedClusterList} from "app/backend";
import {ActionPayload} from "app/store/actions";

import {api, dataLoad, put} from "./common";

function* fetchClusterList() {
  const result: api.ResultOf<typeof importedClusterList> = yield api.authSafe(
    importedClusterList,
  );
  const taskLabel = "sync imported cluster list";
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel);
    return;
  }

  const clusterNameList = result.payload.cluster_list.map(
    cluster => cluster.name,
  );
  yield put({
    type: "CLUSTER.LIST.FETCH.OK",
    payload: {clusterNameList},
  });

  yield put({
    type: "DATA_READING.SET_UP",
    payload: [
      {
        specificator: "syncDashboard",
        start: {type: "CLUSTER.LIST.SYNC"},
        stop: {type: "CLUSTER.LIST.SYNC.STOP"},
      },
      ...clusterNameList.map(
        (clusterName): ActionPayload["DATA_READING.SET_UP"][0] => ({
          specificator: `syncCluster:${clusterName}`,
          start: {
            type: "CLUSTER.STATUS.SYNC",
            key: {clusterName},
          },
          stop: {
            type: "CLUSTER.STATUS.SYNC.STOP",
            key: {clusterName},
          },
        }),
      ),
    ],
  });
}

const REFRESH = "CLUSTER.LIST.REFRESH";
export const clusterListSyncOptions: Parameters<typeof dataLoad.manage>[0] = {
  START: "CLUSTER.LIST.SYNC",
  STOP: "CLUSTER.LIST.SYNC.STOP",
  REFRESH,
  SUCCESS: "CLUSTER.LIST.FETCH.OK",
  refresh: () => ({type: REFRESH}),
  fetch: fetchClusterList,
};
