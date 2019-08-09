import { createBrowserHistory } from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import * as login from "app/scenes/login";
import * as dashboard from "app/scenes/dashboard";
import * as cluster from "app/services/cluster";
import * as addExistingCluster from "app/scenes/dashboard-add-cluster";
import * as notifications from "app/scenes/notifications";
import * as dataLoad from "app/services/data-load";

/* global window */
/* eslint-disable dot-notation */
const composeMiddleware = (
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose
);

const sagaMiddleware = createSagaMiddleware();

const setupStore = (basename) => {
  const history = createBrowserHistory({ basename });
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      dashboard: dashboard.reducer,
      addExistingCluster: addExistingCluster.reducer,
      cluster: cluster.reducer,
      login: login.reducer,
      notifications: notifications.reducer,
    }),
    composeMiddleware(applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )),
  );

  sagaMiddleware.run(function* rootSaga() {
    yield all([
      ...login.sagas,
      ...dataLoad.sagas,
      ...dashboard.sagas,
      ...cluster.sagas,
      ...addExistingCluster.sagas,
      ...notifications.sagas,
    ]);
  });

  return { store, history };
};
export default setupStore;
