import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
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

const sagaMiddleware = createSagaMiddleware();


const setupStore = (basename) => {
  const history = createBrowserHistory({ basename });
  const { reducers, sagas } = registerPlugins(plugins(history));
  const store = createStore(
    combineReducers(reducers),
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
