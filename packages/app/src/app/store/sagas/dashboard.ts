import {importedClusterList} from "app/backend";
import {ActionPayload} from "app/store/actions";
import {dashboardGetLoadingStatus} from "app/store/selectors";

import {api, dataLoad, put, select} from "./common";

type Reading = ActionPayload["DATA_READING.SET_UP"]["readings"][number];

function* fetchClusterList() {
  const result: api.ResultOf<typeof importedClusterList> = yield api.authSafe(
    importedClusterList,
  );
  const taskLabel = "sync imported cluster list";
  if (result.type !== "OK") {
    yield put({type: "CLUSTER.LIST.FETCH.FAIL"});

    const loadingStatus: ReturnType<typeof dashboardGetLoadingStatus> =
      yield select(dashboardGetLoadingStatus);

    const notFoundOnStart =
      result.type === "BACKEND_NOT_FOUND"
      && (loadingStatus === "not-loaded" || loadingStatus === "not-found");

    if (notFoundOnStart) {
      // In the case of BACKEND_NOT_FOUND it is still necessary put action
      // CLUSTER.LIST.FETCH.FAIL because it is a signal for periodical imported
      // cluster reloading.
      // Redux store reacts on CLUSTER.LIST.BACKEND_NOT_FOUND
      yield put({type: "CLUSTER.LIST.BACKEND_NOT_FOUND"});
    } else {
      yield api.processError(result, taskLabel);
    }
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
