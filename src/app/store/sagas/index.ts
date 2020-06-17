import { all } from "redux-saga/effects";

import addExistingCluster from "./addExistingCluster";
import cluster from "./cluster";
import dashboard from "./dashboard";
import dataLoad from "./dataLoad";
import login from "./login";
import notifications from "./notifications";
import resourceDetail from "./resourceDetail";
import resourcePrimitive from "./resourcePrimitive";
import fenceAgentMetadata from "./fenceAgentMetadata";
import username from "./username";

function* rootSaga() {
  yield all([
    ...username,
    ...login,
    ...dataLoad,
    ...dashboard,
    ...cluster,
    ...addExistingCluster,
    ...notifications,
    ...resourceDetail,
    ...resourcePrimitive,
    ...fenceAgentMetadata,
  ]);
}

export { rootSaga };
