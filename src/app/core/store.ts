import { History } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "app/store/sagas";
import { rootReducer } from "./plug";

/* global window */
/* eslint-disable no-underscore-dangle */
const composeMiddleware = (
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
);

const sagaMiddleware = createSagaMiddleware();

export const setupStore = (history: History) => {
  const store = createStore(
    rootReducer(history),
    composeMiddleware(applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
