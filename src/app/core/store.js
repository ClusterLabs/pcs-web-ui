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

import { registerPlugins } from "./plug-tools";
import plugins from "./plugins";

/* global window */
/* eslint-disable dot-notation */
const composeMiddleware = (
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose
);

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: window["__SAGA_MONITOR_EXTENSION__"],
});

const { reducers, sagas } = registerPlugins(plugins);

const setupStore = (basename) => {
  const history = createBrowserHistory({ basename });
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
    }),
    composeMiddleware(applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )),
  );

  sagaMiddleware.run(function* rootSaga() {
    yield all(sagas);
  });

  return { store, history };
};
export default setupStore;
