import { api, importedClusterList } from "app/backend";
import { SetupDataReading } from "app/store/actions";

import { fork, put } from "./effects";
import { dataLoadManage } from "./dataLoad";
import { callAuthSafe } from "./authSafe";
import { callError } from "./backendTools";

function* fetchDashboardData() {
  const result: api.ResultOf<typeof importedClusterList> = yield callAuthSafe(
    importedClusterList,
  );
  const taskLabel = "sync imported cluster list";
  if (result.type !== "OK") {
    yield callError(result, taskLabel);
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
const dashboardDataSyncOptions: Parameters<typeof dataLoadManage>[0] = {
  START: "DASHBOARD_DATA.SYNC",
  STOP: "DASHBOARD_DATA.SYNC.STOP",
  REFRESH,
  SUCCESS: "DASHBOARD_DATA.FETCH.SUCCESS",
  refresh: () => ({ type: REFRESH }),
  fetch: fetchDashboardData,
};

export default [fork(dataLoadManage, dashboardDataSyncOptions)];
