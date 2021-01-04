import { all } from "redux-saga/effects";

import addExistingCluster from "./addExistingCluster";
import cluster from "./cluster";
import dashboard from "./dashboard";
import dataLoad from "./common/dataLoad";
import login from "./login";
import notifications from "./common/notifications";
import resourceUpdate from "./resourceUpdate";
import resourceCreate from "./resourceCreate";
import resourceAgent from "./resourceAgent";
import fenceAgent from "./fenceAgent";
import username from "./username";
import clusterProperties from "./clusterProperties";
import resourceAgentList from "./resourceAgentList";
import resourceRefreshCleanup from "./resourceRefreshCleanup";
import resourceDelete from "./resourceDelete";
import libAction from "./libAction";
import nodeStartStop from "./nodeStartStop";
import nodeAdd from "./nodeAdd";
import resourceClone from "./resourceClone";
import nodeAuth from "./nodeAuth";
import fixAuth from "./fixAuth";

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
    ...resourceUpdate,
    ...resourceAgent,
    ...fenceAgent,
    ...resourceAgentList,
    ...resourceDelete,
    ...resourceRefreshCleanup,
    ...libAction,
    ...nodeStartStop,
    ...nodeAdd,
    ...resourceClone,
    ...nodeAuth,
    ...fixAuth,
  ]);
}

export { rootSaga };
