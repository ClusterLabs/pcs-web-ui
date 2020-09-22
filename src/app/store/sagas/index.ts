import { all } from "redux-saga/effects";

import addExistingCluster from "./addExistingCluster";
import cluster from "./cluster";
import dashboard from "./dashboard";
import dataLoad from "./dataLoad";
import login from "./login";
import notifications from "./notifications";
import resourceDetail from "./resourceDetail";
import resourceUpdate from "./resourceUpdate";
import resourceCreate from "./resourceCreate";
import resourceAction from "./resourceAction";
import resourceAgent from "./resourceAgent";
import fenceAgent from "./fenceAgent";
import username from "./username";
import clusterProperties from "./clusterProperties";
import resourceAgentList from "./resourceAgentList";

function* rootSaga() {
  yield all([
    ...username,
    ...login,
    ...dataLoad,
    ...dashboard,
    ...cluster,
    ...clusterProperties,
    ...addExistingCluster,
    ...notifications,
    ...resourceCreate,
    ...resourceDetail,
    ...resourceUpdate,
    ...resourceAgent,
    ...fenceAgent,
    ...resourceAgentList,
    ...resourceAction,
  ]);
}

export { rootSaga };
