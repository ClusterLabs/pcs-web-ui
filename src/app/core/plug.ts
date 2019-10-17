import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { all } from "redux-saga/effects";

import * as username from "app/services/username";
import * as login from "app/scenes/login";
import * as dashboard from "app/scenes/dashboard";
import * as resourceTree from "app/scenes/resource-tree";
import * as cluster from "app/services/cluster";
import * as addExistingCluster from "app/scenes/dashboard-add-cluster";
import * as notifications from "app/scenes/notifications";
import * as dataLoad from "app/services/data-load";
import * as resourceDetail from "app/scenes/resource-detail";
import * as resourcePrimitive from "app/scenes/resource-primitive";

import { RootState } from "./types";

const rootReducer = (history: History) => combineReducers<RootState>({
  username: username.reducer,
  router: connectRouter(history),
  dashboard: dashboard.reducer,
  addExistingCluster: addExistingCluster.reducer,
  cluster: cluster.reducer,
  resourceTree: resourceTree.reducer,
  resourcePrimitive: resourcePrimitive.reducer,
  login: login.reducer,
  notifications: notifications.reducer,
});

function* rootSaga() {
  yield all([
    ...username.sagas,
    ...login.sagas,
    ...dataLoad.sagas,
    ...dashboard.sagas,
    ...cluster.sagas,
    ...addExistingCluster.sagas,
    ...notifications.sagas,
    ...resourceDetail.sagas,
    ...resourcePrimitive.sagas,
  ]);
}

export { rootReducer, rootSaga };
