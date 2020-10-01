import { importedClusterList } from "app/backend";
import { SetupDataReading } from "app/store/actions";

import { api, dataLoad, fork, put } from "./common";

function* fetchDashboardData() {
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
    type: "DASHBOARD_DATA.FETCH.SUCCESS",
    payload: { clusterNameList },
  });

  yield put({
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
}

const REFRESH = "DASHBOARD_DATA.REFRESH";
const dashboardDataSyncOptions: Parameters<typeof dataLoad.manage>[0] = {
  START: "DASHBOARD_DATA.SYNC",
  STOP: "DASHBOARD_DATA.SYNC.STOP",
  REFRESH,
  SUCCESS: "DASHBOARD_DATA.FETCH.SUCCESS",
  refresh: () => ({ type: REFRESH }),
  fetch: fetchDashboardData,
};

export default [fork(dataLoad.manage, dashboardDataSyncOptions)];
