import {all} from 'redux-saga/effects'

import loginSaga from "app/scenes/login/sagas.js"
import dashboardSaga from "app/scenes/dashboard/sagas.js"
import clusterSaga from "app/services/cluster/sagas.js"
import clusterPropertiesSaga from "app/scenes/cluster-properties/sagas.js"
import clusterNodeAddSaga from "app/scenes/cluster-node-add/sagas.js"
import notificationSaga from "app/scenes/notifications/sagas.js"



export default function* rootSaga(){
  yield all([
    ...loginSaga,
    ...dashboardSaga,
    ...clusterSaga,
    ...clusterPropertiesSaga,
    ...clusterNodeAddSaga,
    ...notificationSaga,
  ]);
}
