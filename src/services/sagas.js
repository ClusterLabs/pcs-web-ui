import {all} from 'redux-saga/effects'
import loginSaga from "../scenes/login/sagas.js"
import dashboardSaga from "../scenes/dashboard/sagas.js"
import clusterSaga from "./cluster/sagas.js"
import clusterPropertiesSaga from "../scenes/cluster-properties/sagas.js"
import clusterNodeAddSaga from "../scenes/cluster-node-add/sagas.js"

export default function* rootSaga(){
  yield all([
    ...loginSaga,
    ...dashboardSaga,
    ...clusterSaga,
    ...clusterPropertiesSaga,
    ...clusterNodeAddSaga,
  ]);
}
