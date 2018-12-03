import { all } from "redux-saga/effects";

import loginSaga from "app/scenes/login/sagas";
import dashboardSaga from "app/scenes/dashboard/sagas";
import clusterSaga from "app/services/cluster/sagas";
import clusterPropertiesSaga from "app/scenes/cluster-properties/sagas";
import notificationSaga from "app/scenes/notifications/sagas";
import dataLoadSaga from "app/services/data-load/sagas";

export default function* rootSaga() {
  yield all([
    ...loginSaga,
    ...dashboardSaga,
    ...clusterSaga,
    ...clusterPropertiesSaga,
    ...notificationSaga,
    ...dataLoadSaga,
  ]);
}
