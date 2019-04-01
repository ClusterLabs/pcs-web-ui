import { all } from "redux-saga/effects";

import loginSaga from "app/scenes/login/sagas";
import dashboardSaga from "app/scenes/dashboard/sagas";
import clusterSaga from "app/services/cluster/sagas";
import notificationSaga from "app/scenes/notifications/sagas";
import dataLoadSaga from "app/services/data-load/sagas";
import addExistingCluster from "app/scenes/dashboard-add-cluster/sagas";

export default function* rootSaga() {
  yield all([
    ...loginSaga,
    ...dashboardSaga,
    ...clusterSaga,
    ...notificationSaga,
    ...dataLoadSaga,
    ...addExistingCluster,
  ]);
}
